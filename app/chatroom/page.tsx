'use client'
import useGeolocation from "@/utils/useGeoLocation"
import { useUserCount } from "@/utils/useUsers";
import { useState } from "react"
import Navbar from "@/components/Navbar";
import ChatFeed from "@/components/ChatFeed";
import ChatBar from "@/components/ChatBar";
import RangeSlider from "@/components/RangeSlider";

export default function ChatRoom() {
    const { location } = useGeolocation();
    const [messageCount, setMessageCount] = useState<number>(0)
    const [range, setRange] = useState<number>(5);
    const { userCount } = useUserCount(range, location);

    if (!location) return (
        <div className="h-full w-full flex justify-center items-center text-6xl mb-20 text-center">
            <h1>Please activate location services to use Proxichat</h1>
        </div>
    )

    return (
        <>
            <Navbar />
            <RangeSlider range={range} setRange={setRange} userCount={userCount} />
            <ChatFeed range={range} location={location} messageCount={messageCount} />
            <ChatBar range={range} location={location} setMessageCount={setMessageCount} />
        </>
    )
}