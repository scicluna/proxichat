'use client'
import useGeolocation from "@/utils/useGeoLocation"
import { useUserCount } from "@/utils/useUsers";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import ChatFeed from "@/components/ChatFeed";
import ChatBar from "@/components/ChatBar";
import RangeSlider from "@/components/RangeSlider";

export default function ChatRoom() {
    const { data: session } = useSession();
    const { location, error } = useGeolocation();
    const [range, setRange] = useState<number>(5);
    const { userCount } = useUserCount(range, location);

    if (!location) return <h1>Please activate location services to use Proxichat</h1>

    return (
        <>
            <Navbar />
            <RangeSlider range={range} setRange={setRange} userCount={userCount} />
            <ChatFeed range={range} location={location} />
            <ChatBar location={location} />
        </>
    )
}