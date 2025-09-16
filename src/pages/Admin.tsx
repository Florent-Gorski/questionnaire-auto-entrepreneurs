import { useMemo, useState } from 'react';

type Row = Record<string, unknown>;

function downloadBlob(data: BlobPart, filename: string, type: string)
{
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function stringifyCell(v: unknown): string
{
  if (v === null || v === undefined) return '';
  if (Array.isArray(v)) return v.map((x) => String(x)).join(', ');
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

export default function Admin()
{
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  const endpoint = useMemo<string>(() =>
  {
    return `${window.location.origin}/.netlify/functions/export-responses`;
  }, []);

  const fetchJson = async () =>
  {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        headers: { 'X-ADMIN-TOKEN': token || '' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${await res.text()}`);
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const normalized: Row[] = data.map((d) =>
          (d && typeof d === 'object' ? (d as Record<string, unknown>) : {})
        );
        setRows(normalized);
      } else {
        setRows([]);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = async () =>
  {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${endpoint}?format=csv`, {
        headers: { 'X-ADMIN-TOKEN': token || '' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${await res.text()}`);
      const text = await res.text();
      const filename = `questionnaire_responses_${new Date()
        .toISOString()
        .replace(/[:.]/g, '-')}.csv`;
      downloadBlob(text, filename, 'text/csv;charset=utf-8;');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const headers: string[] = useMemo(() =>
  {
    if (!rows.length) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-900">Admin — Réponses au questionnaire</h1>
        <p className="mt-2 text-slate-600">
          Cette page appelle la fonction Netlify sécurisée. Saisis ton <strong>ADMIN_TOKEN</strong> (jamais stocké).
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            type="password"
            placeholder="ADMIN_TOKEN"
            className="rounded-lg border px-4 py-3 bg-white"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            disabled={loading || !token}
            onClick={fetchJson}
            className="rounded-lg px-4 py-3 bg-emerald-600 text-white disabled:opacity-50"
          >
            {loading ? 'Chargement…' : 'Voir les réponses (JSON)'}
          </button>
          <button
            disabled={loading || !token}
            onClick={exportCsv}
            className="rounded-lg px-4 py-3 bg-swiss-red text-white disabled:opacity-50"
            title="Télécharger un CSV"
          >
            Exporter CSV
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        <div className="mt-6 bg-white border rounded-xl overflow-auto">
          {!rows.length ? (
            <div className="p-6 text-slate-500">Aucune donnée à afficher.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  {headers.map((h) => (
                    <th key={h} className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-t">
                    {headers.map((h) =>
                    {
                      const v: unknown = (r as Record<string, unknown>)[h];
                      const text = stringifyCell(v);
                      return (
                        <td key={h} className="px-4 py-2 align-top whitespace-pre-wrap">
                          {text}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Astuce : modifie le token dans Netlify → Site settings → Environment variables → <code>ADMIN_TOKEN</code>.
        </p>
      </div>
    </div>
  );
}
