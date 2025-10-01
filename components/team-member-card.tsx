"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquarePlus, MessagesSquare } from "lucide-react"
import { LeaveMessageModal } from "@/components/leave-message-modal"
import { ViewMessagesModal } from "@/components/view-messages-modal"
import type { TeamMember } from "@/lib/types"

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isLeaveMessageOpen, setIsLeaveMessageOpen] = useState(false)
  const [isViewMessagesOpen, setIsViewMessagesOpen] = useState(false)

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <Card className="flex h-full flex-col bg-[#ECE8E8] transition-shadow hover:shadow-lg">
        <CardHeader className="flex-row items-start gap-4 space-y-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar_url || undefined} alt={member.name} />
            <AvatarFallback className="bg-primary font-helvetica text-lg text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{member.name}</CardTitle>
            {member.role && <CardDescription className="mt-1 font-mono text-sm">{member.role}</CardDescription>}
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          {member.bio && <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>}
          <div className="flex gap-2">
            <Button
              onClick={() => setIsLeaveMessageOpen(true)}
              className="flex-1 bg-black text-success-foreground hover:bg-success/90"
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Leave a Message
            </Button>
            <Button
              onClick={() => setIsViewMessagesOpen(true)}
              variant="outline"
              className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <MessagesSquare className="mr-2 h-4 w-4" />
              View Messages
            </Button>
          </div>
        </CardContent>
      </Card>

      <LeaveMessageModal member={member} open={isLeaveMessageOpen} onOpenChange={setIsLeaveMessageOpen} />
      <ViewMessagesModal member={member} open={isViewMessagesOpen} onOpenChange={setIsViewMessagesOpen} />
    </>
  )
}
