'use client'
import { Chat } from "@/utils/useChatPolling"
import { Location } from "@/utils/useGeoLocation"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type ChatFeedProps = {
    range: number
    location: Location
    chats: Chat[]
}

export default function ChatFeed({ range, location, chats }: ChatFeedProps) {
    const [newMessage, setNewMessage] = useState(false)
    const [loading, setLoading] = useState(true)
    const chatContainer = useRef<HTMLDivElement>(null)
    const lastMessage = useRef<HTMLDivElement>(null)
    const chatCount = useRef(0)

    useEffect(() => {
        let scroller = setInterval(() => {
            scrollToBottom()
            if (lastMessage.current) {
                clearInterval(scroller)
            }
        }, 100)
    }, [loading])


    useEffect(() => {
        if (!chatContainer.current || !chats) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainer.current;
        const diff = scrollHeight - (scrollTop + clientHeight);
        const threshold = 50;
        const isAtBottom = diff <= threshold;

        if (isAtBottom) {
            scrollToBottom()
        } else if ((chatCount.current != chats.length) && chatCount.current !== 0) {
            setNewMessage(true)
            chatCount.current = chats.length
        } else {
            chatCount.current = chats.length
        }

        if (loading) {
            setLoading(false)
        }
    }, [chats, range]);

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
                    {chat?.author?.username
                        ?
                        <Link href={`/profile/${chat?.author?._id}`}><b>{chat?.author?.username || '---User Deleted---'}</b>: {chat.chatbody}</Link>
                        :
                        <>
                            <b>---User Deleted---</b> {chat.chatbody}
                        </>
                    }

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