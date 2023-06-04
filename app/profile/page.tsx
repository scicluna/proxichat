'use client'
import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function MyProfile() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return redirect('/')
        }
    })


    return (
        <>
            <Navbar />
            <section className="h-full overflow-y-scroll scrollbar-hide p-1 mx-1 shadow-md shadow-gray-300 bg-gray-100 relative">
                {status === "loading" ? (
                    <h1>Loading...</h1>
                ) : (
                    <h1>{session?.user?.name}'s Profile</h1 >
                )
                }
            </section>
        </>
    )
}