'use client'
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <>
            {session && (
                <nav>
                    <button type="button" onClick={() => signOut({ callbackUrl: "/" })}
                        className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all 
                        hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center">
                        Sign Out
                    </button>
                </nav>
            )}
        </>
    )
}