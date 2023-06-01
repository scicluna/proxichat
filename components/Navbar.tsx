'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { signOutUser } from "@/utils/signOut"
import Link from "next/link"

export default function Navbar() {
    const { data: session } = useSession()
    const [dropDown, setDropDown] = useState(false)

    return (
        <>
            <nav className="h-12 p-1 mx-1 flex justify-between bg-gray-200 shadow-md shadow-gray-300">
                <div className="flex">
                    <Link href={`/chatroom`}>
                        <Image src='/assets/images/logo.webp' width={37} height={37} alt="logo" />
                    </Link>
                </div>
                {session?.user && (
                    <div className="flex">
                        <Image src={session.user.image!} width={37} height={37}
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