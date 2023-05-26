'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Location } from './useGeoLocation';

type Chat = {
    author: string
    latitude: number
    longitude: number
    chatbody: string
    created_at: Date
    updated_at: Date
}

export default function getChats(range: number, location: Location) {
    const [chats, setChats] = useState<Chat[] | null>(null);
    const [error, setError] = useState<String | null>(null);
    const { data: session } = useSession();

    async function fetchChats() {
        const response = await fetch(`/api/chats/${range}/${location.latitude}/${location.longitude}`)
        const processedChats = await response.json()
        setChats(processedChats)
    }

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        const fetchWithDelay = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                fetchChats()
            }, 500)
        }
        if (session && location && range) {
            fetchWithDelay()
        } else {
            setError('Unable to retrieve messages')
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };

    }, [range, location])

    return { chats, error }
}