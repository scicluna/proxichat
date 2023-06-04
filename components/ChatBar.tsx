'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Location } from "@/utils/useGeoLocation"
import { Chat } from "@/utils/useChatPolling"
import { v4 as uuidv4 } from 'uuid'

type ChatBarProps = {
    range: number
    location: Location
    displayChats: (chat: Chat) => void
}

export default function ChatBar({ range, location, displayChats }: ChatBarProps) {
    const [text, setText] = useState<string>('')
    const { data: session } = useSession()

    async function submitChat(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!text) return

        const tempId = uuidv4()
        // Create a new chat message
        const newChat: Chat = {
            tempId: tempId,
            author: { _id: session!.user!.id!, username: session!.user!.name!, image: session!.user!.image!, latitude: location.latitude, longitude: location.longitude, online: true },
            latitude: location.latitude,
            longitude: location.longitude,
            chatbody: text,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Add the new chat message to local state
        displayChats(newChat)
        setText('')

        //post request to submit the new chat
        const response = await fetch('/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, location, text, tempId })
        })

        if (!response.ok) {
            console.error('Failed to chat')
        }

    }

    return (
        <section className="mt-auto p-1 shadow-sm shadow-gray-300">
            <form className="relative">
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full shadow-md shadow-gray-400 p-1 bg-gray-100 bg-opacity-80" placeholder="Type..." />
                <button type="submit" onClick={submitChat} className="absolute p-0 right-1 bottom-1 text-gray-400 hover:text-gray-900 w-5">{'>'}</button>
            </form>
        </section>
    )
}