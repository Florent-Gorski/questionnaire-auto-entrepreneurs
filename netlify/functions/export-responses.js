const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const token = event.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return { statusCode: 500, body: 'Missing Supabase env' };
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from('questionnaire_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { statusCode: 500, body: error.message };

  const format = (event.queryStringParameters && event.queryStringParameters.format) || 'json';

  if (format === 'csv') {
    const rows = data || [];
    if (!rows.length) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="questionnaire_responses.csv"' },
        body: ''
      };
    }
    const headers = Object.keys(rows[0]);
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
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="questionnaire_responses.csv"' },
      body: csv
    };
  }

  return { statusCode: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(data || []) };
};
