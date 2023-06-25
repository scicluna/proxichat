'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { signOutUser } from "@/utils/signOut"
import Link from "next/link"
import { redirect } from 'next/navigation'

export default function Navbar() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return redirect('/')
        }
    })
    const [dropDown, setDropDown] = useState(false)

    if (status === "loading") {
        return (
            <nav className="h-12 p-1 mx-1 flex justify-center bg-gray-200 shadow-md shadow-gray-300">
                <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            </nav>
        )
    }

    if (!session) {
        return redirect('/')
    }

    return (
        <>
            <nav className="h-12 p-1 px-1 flex justify-between bg-gray-200 shadow-md shadow-gray-300">
                <div className="flex">
                    <Link href={`/chatroom`}>
                        <Image src='/assets/images/proxichatlogo.webp' priority width={40} height={40} alt="logo" />
                    </Link>
                </div>
                {session?.user && (
                    <div className="flex">
                        <Image src={session.user.image!} width={40} height={40}
                            className="rounded-full hover:cursor-pointer" alt="profile" onClick={e => setDropDown(prev => !prev)} />
                        {dropDown && (
                            <div className='absolute z-10 right-2 top-8 mt-5 p-2 rounded-lg shadow-lg shadow-gray-300 bg-gray-200 outline-2 min-w-[120px] flex flex-col gap-1 justify-end items-end'>
                                <Link href="/profile" className="hover:text-gray-400">Profile</Link>
                                <button type="button" onClick={() => {
                                    setDropDown(false)
                                    signOutUser(session)
                                }} className="hover:text-gray-400">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>)
                }
            </nav>
        </>
    )
}