'use client'
import { useState, useEffect } from "react"
import { Location } from "./useGeoLocation"

export function useUserCount(range: number, location: Location | null) {
    const [userCount, setUserCount] = useState(0)
    const [error, setError] = useState('')

    async function fetchUserCount() {
        if (range && location) {
            const response = await fetch(`/api/user/${range}/${location.latitude}/${location.longitude}`)
            const users = await response.json()
            setUserCount(users.length)
        }
    }
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null
        const fetchWithDelay = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                fetchUserCount()
            }, 500)
        }
        if (location && range) {
            fetchWithDelay()
        } else {
            setError('Unable to retrieve users')
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [range, location])
    return { userCount, error }
}