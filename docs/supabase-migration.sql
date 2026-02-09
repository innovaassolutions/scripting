-- Run this in your Supabase SQL Editor to create the scripts table

create table if not exists scripts (
  id uuid default gen_random_uuid() primary key,
  title_1 text not null default '',
  title_2 text not null default '',
  title_3 text not null default '',
  opening_hook text not null default '',
  credibility_points text not null default '',
  story_or_quote text not null default '',
  key_point_1 text not null default '',
  key_point_2 text not null default '',
  key_point_3 text not null default '',
  key_point_4 text not null default '',
  key_point_5 text not null default '',
  point_1_details text not null default '',
  point_2_details text not null default '',
  point_3_details text not null default '',
  point_4_details text not null default '',
  point_5_details text not null default '',
  helpful_ending text not null default '',
  revenue_cta text not null default '',
  revenue_cta_placement text not null default '',
  shot_1 text not null default '',
  shot_2 text not null default '',
  shot_3 text not null default '',
  shot_4 text not null default '',
  shot_5 text not null default '',
  shot_6 text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Auto-update updated_at on row changes
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_scripts_updated_at
  before update on scripts
  for each row
  execute function update_updated_at_column();

-- Enable RLS with allow-all policies (no auth for v1)
alter table scripts enable row level security;

create policy "Allow all reads" on scripts for select using (true);
create policy "Allow all inserts" on scripts for insert with check (true);
create policy "Allow all updates" on scripts for update using (true);
create policy "Allow all deletes" on scripts for delete using (true);
