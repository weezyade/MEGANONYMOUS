import { createClient } from "@/lib/supabase/server"
import { TeamMemberCard } from "@/components/team-member-card"
import type { TeamMember } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function Home() {
  const supabase = await createClient()

  const { data: teamMembers, error } = await supabase.from("team_members").select("*").order("id", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching team members:", error)
  }

  return (
    <main className="min-h-screen bg-[#DFD9D9]">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            MegaTeamWall
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-mono text-muted-foreground md:text-xl">
            Send kind words to the MegaETH team, maybe it'll push mainnet to existence...
          </p>
        </div>

        {/* Team Members Grid */}
        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member: TeamMember) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No team members found. Add team members in your Supabase database to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
