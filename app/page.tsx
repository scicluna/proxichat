'use client'
import { BuiltInProviderType } from "next-auth/providers"
import { signIn, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    const { data: session } = useSession()

    useEffect(() => {
        async function setUpProviders() {
            const response = await getProviders();
            setProviders(response)
        }
        setUpProviders()
    }, [])

    return (
        <div className="flex flex-col gap-10 w-full h-full justify-center items-center pb-10 bg-gray-200">
            <div className="flex">
                <h1 className="text-4xl">ProxiChat</h1>
                <Image src='/assets/images/logo.webp' width={37} height={37} alt="logo" />
            </div>

            {(providers && !session) ?
                Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: "/chatroom" })}
                        className="rounded-full border border-black bg-black py-5 px-5 text-white transition-all 
                        hover:bg-white hover:text-black text-center flex items-center justify-center text-5xl">
                        Sign In
                    </button>
                )) : <h1 className="rounded-full py-5 px-5 border-transparent border
                hover:bg-white hover:text-black text-center flex items-center justify-center text-5xl">Loading...</h1>}
        </div>
    )
}