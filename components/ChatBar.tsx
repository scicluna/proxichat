'use client'
import { useState, SetStateAction } from "react"
import { useSession } from "next-auth/react"
import { Location } from "@/utils/useGeoLocation"

type ChatBarProps = {
    range: number
    location: Location
    setMessageCount: React.Dispatch<SetStateAction<number>>
}

export default function ChatBar({ range, location, setMessageCount }: ChatBarProps) {
    const [text, setText] = useState<string>('')
    const { data: session } = useSession()

    async function submitChat(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        //Post Request here using text and session details and location
        const response = await fetch('/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, location, text })
        })

        if (!response.ok) {
            console.error('Failed to chat')
        }

        setMessageCount(prev => prev + 1)
        //Cool! Then some way to signal the chat feed (WS or whatever)

        setText('')
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