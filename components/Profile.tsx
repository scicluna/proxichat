'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { signOutUser } from "@/utils/signOut"
import Link from "next/link"
import { redirect } from 'next/navigation'

export default function Profile() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            return redirect('/')
        }
    })
    const [dropDown, setDropDown] = useState(false)

    return (
        <>
            {session?.user && (
                <div className="flex relative z-10">
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
        </>
    )
}