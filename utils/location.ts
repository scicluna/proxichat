'use client'
import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState<{} | null>(null);
    const [error, setError] = useState<String | null>(null);

    const handleSuccess = (position: GeolocationPosition) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
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
    }, []);

    return { location, error };
};

export default useGeolocation;
