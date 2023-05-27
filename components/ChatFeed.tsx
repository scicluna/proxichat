'use client'
import { useChatPolling } from "@/utils/useChatPolling"
import { Location } from "@/utils/useGeoLocation"
import { useEffect } from "react"

type ChatFeedProps = {
    range: number
    location: Location
    messageCount: number
}

export default function ChatFeed({ range, location, messageCount }: ChatFeedProps) {
    const { chats, error } = useChatPolling(range, location, messageCount);

    return (
        <section className="h-full overflow-y-scroll m-2">
            {chats && chats.map((chat, i) => (
                <h1 key={i}>{chat.chatbody}</h1>
            ))}
        </section>
    )
}