-- ============================================
-- course_registrations table for jsltcc.com /register page
-- Run in Supabase → SQL Editor → New Query → Run
-- ============================================

create table if not exists public.course_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  preferred_level text not null check (preferred_level in ('N5', 'N4', 'N3')),
  source text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'enrolled', 'not_interested')),
  notes text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists course_registrations_created_idx
  on public.course_registrations (created_at desc);
create index if not exists course_registrations_status_idx
  on public.course_registrations (status);

-- RLS with no policies — only the service-role key (used by the Next.js
-- /api/register route) can read/write. The anon key cannot touch this table.
alter table public.course_registrations enable row level security;
