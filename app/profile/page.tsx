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
                {status === "loading" || !session ? (
                    <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="font-bold text-2xl">{`${session.user?.name}'s Profile`}</h1 >
                        <h1 className="text-xl">{'Currently Online'}</h1>
                        <h1 className="text-xl text-gray-500">More Coming Soon!</h1>
                    </>
                )
                }
            </section>
        </>
    )
}