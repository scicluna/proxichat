'use client'
import { connectToDB } from "@/utils/database";
import useGeolocation from "@/utils/useGeoLocation"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";

export default function ChatRoom() {
    const { data: session } = useSession();
    const { location, error } = useGeolocation();



    return (
        <h1>chatroom</h1>
    )
}