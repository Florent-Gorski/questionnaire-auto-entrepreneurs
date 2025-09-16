// Usage: node scripts/export-to-csv.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('[export] Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function toCsv(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v) => {
    if (v === null || v === undefined) return '';
    if (Array.isArray(v)) v = `{${v.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')}}`;
    const s = String(v).replace(/"/g, '""').replace(/\r?\n/g, ' ');
    return `"${s}"`;
  };
  const lines = [
    headers.map(h => `"${h}"`).join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
  ];
  return lines.join('\n');
}

try {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const outDir = path.join(process.cwd(), 'exports');
  fs.mkdirSync(outDir, { recursive: true });

  const filename = `questionnaire_responses_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, toCsv(data ?? []), 'utf8');

  console.log(`[export] Done: ${outPath} (${data?.length ?? 0} rows)`);
} catch (e) {
  console.error('[export] Failed:', e.message || e);
  process.exit(1);
}
