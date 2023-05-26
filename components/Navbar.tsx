'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { signOutUser } from "@/utils/signOut"

export default function Navbar() {
    const { data: session } = useSession()
    const [dropDown, setDropDown] = useState(false)

    return (
        <>
            <nav className="h-12 p-1 flex justify-between bg-gray-300 bg-opacity-70">
                <div className="flex">
                    <Image src='/assets/images/logo.webp' width={37} height={37} alt="logo" />
                </div>
                {session?.user && (
                    <div className="flex">
                        <Image src={session.user.image!} width={37} height={37}
                            className="rounded-full hover:cursor-pointer" alt="profile" onClick={e => setDropDown(prev => !prev)} />
                        {dropDown && (
                            <div className='absolute right-6 top-5 mt-5 p-5 rounded-lg shadow-md shadow-gray-400 bg-gray-300 min-w-[120px] flex flex-col gap-2 justify-end items-end'>
                                <h1>Profile</h1>
                                <h1>Settings</h1>
                                <button type="button" onClick={() => {
                                    setDropDown(false)
                                    signOutUser(session)
                                }} className='w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'>
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