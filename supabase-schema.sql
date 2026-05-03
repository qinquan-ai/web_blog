-- Create a table to store individual visits
create table if not exists public.page_visits (
  id uuid default gen_random_uuid() primary key,
  slug text not null,
  visitor_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries
create index if not exists page_visits_slug_idx on public.page_visits (slug);

-- Create a view to easily get PV (Page Views) and UV (Unique Visitors) per slug
create or replace view public.page_stats as
select 
  slug,
  count(id) as pv,
  count(distinct visitor_id) as uv
from public.page_visits
group by slug;

-- Enable Row Level Security (RLS)
alter table public.page_visits enable row level security;

-- Allow anonymous users to insert new visits (we only allow insert, not select/update/delete)
create policy "Allow anonymous inserts" 
  on public.page_visits for insert 
  with check (true);

-- Allow anonymous users to read stats from the view
-- Views don't have RLS by default in Supabase unless created with security invoker. 
-- For our use case, default is fine, anyone can select from the view.

-- Function to record a visit and return the updated stats atomically
create or replace function public.track_visit(p_slug text, p_visitor_id text)
returns table(pv bigint, uv bigint)
language plpgsql
security definer
as $$
begin
  -- 1. Insert the new visit
  insert into public.page_visits (slug, visitor_id)
  values (p_slug, p_visitor_id);
  
  -- 2. Return the updated stats for this slug
  return query
  select 
    count(id) as pv,
    count(distinct visitor_id) as uv
  from public.page_visits
  where slug = p_slug;
end;
$$;
