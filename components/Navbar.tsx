'use client'
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <>
            <nav className="h-12 m-2 flex justify-between">
                <h1>logo</h1>
                <div>
                    <h1>profile</h1>
                </div>
            </nav>
        </>
    )
}