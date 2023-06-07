'use client'
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

type OtherProfileProps = {
    params: {
        id: string
    }
}

export type User = {
    _id: string,
    email: string,
    username: string,
    ___v: number,
    latitude: number,
    longitude: number,
    online: boolean
}

export default function OtherProfile({ params }: OtherProfileProps) {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    async function getUser(id: string) {
        const response = await fetch(`/api/profile/${id}`)
        const userProfile = await response.json()
        setUser(userProfile)
    }

    useEffect(() => {
        if (!loading) {
            getUser(params.id)
        }
        setTimeout(() => {
            setLoading(false)
        }, 150)
    }, [loading])

    return (
        <>
            <Navbar />
            <section className="h-full overflow-y-scroll scrollbar-hide p-1 mx-1 shadow-md shadow-gray-300 bg-gray-100 relative">
                {loading ? (
                    <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <h1>{user ? `${user?.username}'s Profile` : 'Loading...'}</h1 >
                )
                }
            </section>
        </>
    )
}