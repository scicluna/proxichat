'use client'
import useGeolocation from "@/utils/useGeoLocation"
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
    const [chats, setChats] = useState<object[] | null>(null);
    const [userCount, setUserCount] = useState<number>(0);

    return (
        <>
            <Navbar />
            <RangeSlider range={range} setRange={setRange} />
            <ChatFeed />
            <ChatBar />
        </>
    )
}