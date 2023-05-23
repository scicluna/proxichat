'use client'
import useGeolocation from "@/utils/location"
import { useState, useEffect, SetStateAction } from "react"

export default function ChatRoom() {
    const { location, error } = useGeolocation();

    console.log(location)

    return (
        <h1>chatroom</h1>
    )
}