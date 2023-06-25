'use client'
import useGeolocation from "@/utils/useGeoLocation"
import { useUserCount } from "@/utils/useUsers";
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";
import ChatFeed from "@/components/ChatFeed";
import ChatBar from "@/components/ChatBar";
import RangeSlider from "@/components/RangeSlider";
import { useChatPolling } from "@/utils/useChatPolling";
import { Chat } from "@/utils/useChatPolling";

export default function ChatRoom() {
    let { location, setLocation } = useGeolocation();
    const [range, setRange] = useState<number>(5);
    const { userCount } = useUserCount(range, location);
    const { chats, changeChats } = useChatPolling(range, location!)
    const [firstLoad, setFirstLoad] = useState(localStorage.getItem('firstLoad') || true);

    useEffect(() => {
        // Whenever firstLoad changes, update the stored value
        localStorage.setItem('firstLoad', JSON.stringify(false));
        setFirstLoad(false)
    }, [firstLoad]);

    if (!location && firstLoad) return (
        <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center">
            <h1>Please activate location services to use Proxichat</h1>
            <button className="rounded-full border border-black bg-black py-5 px-5 text-white transition-all 
                        hover:bg-white hover:text-black text-center flex items-center justify-center text-2xl"
                onClick={() => requestLocation()}>Activate Location</button>
        </div>
    )

    if (!location || !chats) return (
        <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            <h1 className="text-3xl">Make sure your device has enabled location services!</h1>
        </div>
    )

    function requestLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

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