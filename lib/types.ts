export interface TeamMember {
  id: number
  name: string
  role: string | null
  bio: string | null
  avatar_url: string | null
  created_at?: string
}

export interface Message {
  id: number
  member_id: number
  name: string | null
  message: string
  hearts_count: number
  timestamp: string
}
