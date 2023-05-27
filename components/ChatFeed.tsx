'use client'
import { useChatPolling } from "@/utils/useChatPolling"
import { Location } from "@/utils/useGeoLocation"
import { useEffect, useRef, useState } from "react"

type ChatFeedProps = {
    range: number
    location: Location
    messageCount: number
}

export default function ChatFeed({ range, location, messageCount }: ChatFeedProps) {
    const [newMessage, setNewMessage] = useState(false)
    const { chats } = useChatPolling(range, location, messageCount);
    const chatContainer = useRef<HTMLDivElement>(null)
    const lastMessage = useRef<HTMLDivElement>(null)
    const chatCount = useRef(0)

    useEffect(() => {
        if (!chatContainer.current || !chats) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainer.current;
        const diff = scrollHeight - (scrollTop + clientHeight);
        const threshold = 30;
        const isAtBottom = diff <= threshold;

        if (isAtBottom) {
            scrollToBottom()
        } else if ((chatCount.current != chats.length) && chatCount.current !== 0) {
            setNewMessage(true)
            chatCount.current = chats.length
        } else {
            chatCount.current = chats.length
        }
    }, [chats]);

    function scrollToBottom() {
        if (lastMessage.current && chatContainer.current) {
            chatContainer.current.scrollTo({
                top: lastMessage.current.offsetTop,
                behavior: "smooth",
            });
            setNewMessage(false)
        }
    }

    return (
        <section className="h-full overflow-y-scroll scrollbar-hide p-1 mx-1 shadow-md shadow-gray-300 bg-gray-100 relative" ref={chatContainer}>
            {chats && chats.map((chat, i) => (
                <div key={i} ref={i === chats.length - 1 ? lastMessage : null}>
                    <p><b>{chat?.author?.username || '---User Deleted---'}</b>: {chat.chatbody}</p>
                </div>
            ))}
            <div className="fixed bottom-10 right-2">
                {newMessage && (
                    <button className="text-gray-400 hover:text-black" onClick={scrollToBottom}>New!</button>
                )}
            </div>
        </section>
    )
}