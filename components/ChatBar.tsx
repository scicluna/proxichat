'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function ChatBar() {
    const [text, setText] = useState<string>('')
    const { data: session } = useSession()

    function submitChat(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        //Post Request here using text and session details
        //Cool! Then some way to signal the chat feed (WS or whatever)

        setText('')
    }

    return (
        <section className="mt-auto m-2">
            <form className="relative">
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full shadow-inner p-1 bg-gray-300 bg-opacity-80" placeholder="Type..." />
                <button type="submit" onClick={submitChat} className="absolute p-0 right-1 bottom-1 text-gray-400 hover:text-gray-900 w-5">{'>'}</button>
            </form>
        </section>
    )
}