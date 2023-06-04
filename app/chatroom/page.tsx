'use client'
import useGeolocation from "@/utils/useGeoLocation"
import { useUserCount } from "@/utils/useUsers";
import { useRef, useState } from "react"
import Navbar from "@/components/Navbar";
import ChatFeed from "@/components/ChatFeed";
import ChatBar from "@/components/ChatBar";
import RangeSlider from "@/components/RangeSlider";
import { useChatPolling } from "@/utils/useChatPolling";
import { Chat } from "@/utils/useChatPolling";

export default function ChatRoom() {
    const { location } = useGeolocation();
    const [range, setRange] = useState<number>(5);
    const { userCount } = useUserCount(range, location);
    const { chats, changeChats } = useChatPolling(range, location!)

    if (!location) return (
        <div className="h-full w-full flex justify-center items-center text-6xl mb-20 text-center">
            <h1>Please activate location services to use Proxichat</h1>
        </div>
    )

    function displayChats(chat: Chat) {
        if (chat) {
            changeChats([...chats!, chat])
        }
    }

    return (
        <>
            <Navbar />
            <RangeSlider range={range} setRange={setRange} userCount={userCount} />
            {chats && <ChatFeed range={range} location={location} chats={chats} />}
            {<ChatBar range={range} location={location} displayChats={displayChats} />}
        </>
    )
}