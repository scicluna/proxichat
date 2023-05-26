'use client'
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
    const { data: session } = useSession()
    const [dropDown, setDropDown] = useState(false)

    return (
        <>
            <nav className="h-12 m-2 flex justify-between">
                <h1>logo</h1>
                {session?.user && (
                    <div className="flex">
                        <Image src={session.user.image!} width={37} height={37}
                            className="rounded-full hover:cursor-pointer" alt="profile" onClick={e => setDropDown(prev => !prev)} />
                        {dropDown && (
                            <h1>Dropdown!</h1>
                        )}
                    </div>)
                }
            </nav>
        </>
    )
}