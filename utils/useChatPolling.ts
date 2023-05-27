'use'
import { useState, useEffect } from 'react';
import { Chat } from './getChats';
import { useSession } from 'next-auth/react';
import { Location } from './useGeoLocation';

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
        fetchChats();

        const interval = setInterval(fetchChats, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Stop polling on cleanup
    }

    useEffect(() => {
        let cleanupFn: () => void = () => { };

        if (session && location && range) {
            cleanupFn = startPolling();
        } else {
            setError('Unable to retrieve messages');
        }

        return cleanupFn;
    }, [range, location, session, messageCount]);

    return { chats, error };
}
