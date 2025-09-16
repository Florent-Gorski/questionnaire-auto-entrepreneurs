// netlify/functions/export-responses.js
const { createClient } = require('@supabase/supabase-js');

const json = (status, body) => ({
  statusCode: status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  try {
    // Auth simple par token
    const token = event.headers['x-admin-token'];
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return json(401, { error: 'Unauthorized: bad ADMIN_TOKEN' });
    }

    const url = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return json(500, {
        error: 'Missing Supabase env',
        have: {
          VITE_SUPABASE_URL: Boolean(url),
          SUPABASE_SERVICE_ROLE_KEY: Boolean(serviceKey),
        },
      });
    }

    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { data, error } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // ex: relation does not exist, RLS, etc.
      return json(500, { error: error.message });
    }

    const format = (event.queryStringParameters && event.queryStringParameters.format) || 'json';

    if (format === 'csv') {
      const rows = data || [];
      const headers = rows.length ? Object.keys(rows[0]) : [];
      const escape = (v) => {
        if (v === null || v === undefined) return '';
        if (Array.isArray(v)) v = `{${v.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')}}`;
        const s = String(v).replace(/"/g, '""').replace(/\r?\n/g, ' ');
        return `"${s}"`;
      };
      const csv = [
        headers.map(h => `"${h}"`).join(','),
        ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
      ].join('\n');

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="questionnaire_responses.csv"',
          'Access-Control-Allow-Origin': '*',
        },
        body: csv,
      };
    }

    return json(200, data || []);
  } catch (e) {
    return json(500, { error: e?.message || String(e) });
  }
};
