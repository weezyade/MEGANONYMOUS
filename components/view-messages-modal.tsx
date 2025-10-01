"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { TeamMember, Message } from "@/lib/types"

interface ViewMessagesModalProps {
  member: TeamMember
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewMessagesModal({ member, open, onOpenChange }: ViewMessagesModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [likingMessageId, setLikingMessageId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchMessages()
    }
  }, [open, member.id])

  const fetchMessages = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("member_id", member.id)
        .order("timestamp", { ascending: false })

      if (error) throw error

      setMessages(data || [])
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (messageId: number, currentHearts: number) => {
    setLikingMessageId(messageId)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("messages")
        .update({ hearts_count: currentHearts + 1 })
        .eq("id", messageId)

      if (error) throw error

      // Update local state
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, hearts_count: currentHearts + 1 } : msg)),
      )
    } catch (error) {
      console.error("[v0] Error liking message:", error)
      toast({
        title: "Error",
        description: "Failed to like message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLikingMessageId(null)
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Messages for {member.name}</DialogTitle>
          <DialogDescription>
            {messages.length === 0 && !isLoading
              ? "No messages yet"
              : `${messages.length} ${messages.length === 1 ? "message" : "messages"}`}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">No messages yet. Be the first to leave one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {msg.name || <span className="italic text-muted-foreground">Anonymous</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(msg.timestamp)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(msg.id, msg.hearts_count)}
                      disabled={likingMessageId === msg.id}
                      className="flex items-center gap-1 text-muted-foreground hover:text-destructive"
                    >
                      <Heart className={`h-4 w-4 ${msg.hearts_count > 0 ? "fill-destructive text-destructive" : ""}`} />
                      <span className="text-xs">{msg.hearts_count}</span>
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-card-foreground">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
