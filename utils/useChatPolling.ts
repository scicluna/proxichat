'use client'
import { useState, useEffect, useRef } from 'react';
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
    tempId: string
    author: Author
    latitude: number
    longitude: number
    chatbody: string
    created_at: Date
    updated_at: Date
}

export function useChatPolling(range: number, location: Location) {
    const [chats, setChats] = useState<Chat[] | null>([]);
    const [firstLoad, setFirstLoad] = useState(true)
    const [error, setError] = useState<String | null>(null);
    const { data: session } = useSession();
    const [pendingChats, setPendingChats] = useState<Chat[] | null>([])

    async function fetchChats() {
        const response = await fetch(`/api/chats/${range}/${location.latitude}/${location.longitude}`);
        const processedChats = await response.json();
        if (pendingChats) {
            const newChats = processedChats.filter((chat: Chat) => !pendingChats.some(pendingChat => pendingChat.tempId === chat.tempId)).reverse()
            setChats([...pendingChats, ...newChats]);
            setPendingChats([])
        } else {
            setChats(processedChats)
        }
    }

    function changeChats(chats: Chat[]) {
        setChats(chats)
        setPendingChats(chats)
    }

    function startPolling() {
        let timeoutId: NodeJS.Timeout | null = null
        let interval: NodeJS.Timeout | null = null

        const fetchChatsDebounced = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            if (firstLoad && location) {
                fetchChats()
                setFirstLoad(false)
            } else if (location) {
                if (interval) {
                    clearInterval(interval)
                }

                timeoutId = setTimeout(() => {
                    fetchChats()
                    // Restart the interval after the debounced fetchChats call
                    interval = setInterval(fetchChats, 5000)
                }, 200)
            }
        }
        fetchChatsDebounced()
        return () => {
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
    }, [range, location, session, chats?.length])

    return { chats, changeChats, error };
}
