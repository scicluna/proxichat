'use client'
import getChats from "@/utils/getChats"
import { Location } from "@/utils/useGeoLocation"
import { useEffect } from "react"

type ChatFeedProps = {
    range: number
    location: Location
}


export default function ChatFeed({ range, location }: ChatFeedProps) {
    const { chats, error } = getChats(range, location);

    return (
        <section className="h-full overflow-y-scroll m-2">
            {chats && chats.map((chat, i) => (
                <h1 key={i}>{chat.chatbody}</h1>
            ))}
        </section>
    )
}