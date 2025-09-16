-- Table des réponses du questionnaire
create table if not exists public.questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  statut text,
  statut_autre text,
  canton text,
  projet text,
  projet_secteur text,
  freins text[] default '{}',
  freins_autre text,
  ressources text[] default '{}',
  ressources_autre text,
  accompagnement text,
  fonctionnalites text[] default '{}',
  plateforme text,
  communication text[] default '{}',
  evenements text,
  plateformes text,
  suggestions text,
  email text
);

-- RLS
alter table public.questionnaire_responses enable row level security;

-- Politique: autoriser l'insert public (vous pouvez durcir ensuite)
create policy "Allow insert from anon" on public.questionnaire_responses
  for insert
  to anon
  with check (true);
