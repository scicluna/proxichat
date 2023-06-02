'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Location } from './useGeoLocation';

export type Author = {
    _id: string
    username: string
    image: string
    latitude: number
    longitude: number
    online: Boolean
}

export type Chat = {
    author: Author
    latitude: number
    longitude: number
    chatbody: string
    created_at: Date
    updated_at: Date
}

export function useChatPolling(range: number, location: Location, messageCount: number) {
    const [chats, setChats] = useState<Chat[] | null>(null);
    const [error, setError] = useState<String | null>(null);
    const { data: session } = useSession();

    async function fetchChats() {
        const response = await fetch(`/api/chats/${range}/${location.latitude}/${location.longitude}`);
        const processedChats = await response.json();
        setChats(processedChats);
    }

    function startPolling() {
        let timeoutId: NodeJS.Timeout | null = null
        let interval: NodeJS.Timeout | null = null

        const fetchChatsDebounced = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                fetchChats()
                // Restart the interval after the debounced fetchChats call
                if (interval) {
                    clearInterval(interval)
                }
                interval = setInterval(fetchChats, 5000) // Poll every 5 seconds
            }, 100)
        }

        fetchChatsDebounced()

        return () => {
            // Clear any pending timeout or interval on cleanup
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            if (interval) {
                clearInterval(interval)
            }
        }
    }


    useEffect(() => {
        const stopPolling = startPolling()
        return stopPolling
    }, [range, location, session, messageCount])


    return { chats, setChats, error };
}
