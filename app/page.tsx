'use client'
import { BuiltInProviderType } from "next-auth/providers"
import { signIn, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { useState, useEffect } from "react"

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
        <>
            {(providers && !session) &&
                Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: "/chatroom" })}
                        className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all 
                        hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center">
                        Sign In
                    </button>
                ))
            }
        </>
    )
}