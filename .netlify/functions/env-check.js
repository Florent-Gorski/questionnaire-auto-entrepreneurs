const { createClient } = require('@supabase/supabase-js');

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify(body),
});

exports.handler = async () => {
  try {
    const have = {
      VITE_SUPABASE_URL: Boolean(process.env.VITE_SUPABASE_URL),
      VITE_SUPABASE_ANON_KEY: Boolean(process.env.VITE_SUPABASE_ANON_KEY),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      ADMIN_TOKEN: Boolean(process.env.ADMIN_TOKEN),
    };

    if (Object.values(have).some(v => !v)) {
      return json(500, { ok: false, have, note: 'Some env vars are missing at runtime' });
    }

    const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const { error } = await supabase
      .from('questionnaire_responses')
      .select('id', { count: 'exact', head: true });

    return json(error ? 500 : 200, {
      ok: !error,
      have,
      table_ok: !error,
      error: error?.message || null,
    });
  } catch (e) {
    return json(500, { ok: false, error: e?.message || String(e) });
  }
};
