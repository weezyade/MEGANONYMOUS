-- Create team_members table
create table if not exists team_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Create messages table with hearts count
create table if not exists messages (
  id bigint generated always as identity primary key,
  member_id bigint references team_members(id) on delete cascade,
  name text,
  message text not null,
  hearts_count int default 0,
  timestamp timestamptz default now()
);

-- Enable Row Level Security (RLS) for public read access
alter table team_members enable row level security;
alter table messages enable row level security;

-- Allow anyone to read team members
create policy "Allow public read access to team_members"
  on team_members for select
  using (true);

-- Allow anyone to read messages
create policy "Allow public read access to messages"
  on messages for select
  using (true);

-- Allow anyone to insert messages (public appreciation wall)
create policy "Allow public insert to messages"
  on messages for insert
  with check (true);

-- Allow anyone to update message hearts count
create policy "Allow public update to message hearts"
  on messages for update
  using (true)
  with check (true);

-- Create index for faster queries
create index if not exists messages_member_id_idx on messages(member_id);
create index if not exists messages_timestamp_idx on messages(timestamp desc);
