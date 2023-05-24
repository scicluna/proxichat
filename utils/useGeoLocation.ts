'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export type Location = {
    latitude: number
    longitude: number
}

const useGeolocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<String | null>(null);
    const { data: session } = useSession()

    const handleSuccess = async (position: GeolocationPosition) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        if (session) {
            const response = await fetch('/api/user/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: session.user?.email, location })
            })

            if (!response.ok) {
                console.error('Failed to update location')
            }
        }
    };

    const handleError = () => {
        setError('Unable to retrieve your location');
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
        }
    }, [session]);

    return { location, error };
};

export default useGeolocation;
