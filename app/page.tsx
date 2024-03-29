'use client'
import { BuiltInProviderType } from "next-auth/providers"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    const { data: session, status } = useSession()

    const isSessionLoading = status === 'loading'
    let reloading: boolean
    useEffect(() => {
        async function startNewProviders() {
            if (session && !isSessionLoading) {
                await signOut({ callbackUrl: '/' })
                reloading = true
            }
            if (providers == null && !isSessionLoading && !reloading) {
                const response = await getProviders()
                setProviders(response)
            }
        }
        startNewProviders()
    }, [isSessionLoading])

    return (
        <div className="flex flex-col gap-10 w-full h-full justify-center items-center pb-10 bg-gray-200">
            <div className="flex">
                <h1 className="text-4xl">ProxiChat</h1>
                <Image src='/assets/images/proxichatlogo.webp' width={37} height={37} alt="logo" />
            </div>
            {(providers && !isSessionLoading)
                ?
                Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: "/chatroom" })}
                        className="rounded-full border border-black bg-black py-5 px-5 h-20 text-white transition-all 
                        hover:bg-white hover:text-black text-center flex items-center justify-center text-5xl">
                        Sign In
                    </button>
                ))
                :
                (
                    <div className="w-full flex flex-col justify-center items-center text-center h-20" >
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                )}
        </div>
    )
}