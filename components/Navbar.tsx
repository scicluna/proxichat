'use client'
import { useSession } from "next-auth/react"


export default function Navbar() {
    const { data: session } = useSession()

    return (
        <>
            {session && (
                <nav>
                    <h1>navbar</h1>
                </nav>
            )}
        </>
    )
}