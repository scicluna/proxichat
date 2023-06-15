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
    updatedAt: string
}

export default function OtherProfile({ params }: OtherProfileProps) {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)



    function getDate(date: string) {
        const newDate = new Date(date)
        const i = newDate.getMinutes()
        const h = newDate.getHours()
        const y = newDate.getFullYear()
        const m = newDate.getMonth()
        const d = newDate.getDate()
        return `${m}/${d}/${y} at ${h}:${i}`
    }

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
                {(loading || !user) ? (
                    <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="font-bold text-2xl">{`${user.username}'s Profile`}</h1 >
                        <h1 className="text-xl">{user.online ? 'Currently Online' : `Last seen on ${getDate(user.updatedAt) || 'unknown'}`}</h1>
                        <h1 className="text-xl text-gray-500">More Coming Soon!</h1>
                    </>
                )
                }
            </section>
        </>
    )
}