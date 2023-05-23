import { PropsWithChildren } from "react"
import Provider from "@/components/Provider"
import Navbar from "@/components/Navbar"
import '@/styles/globals.css'

export const metadata = {
    title: 'Proxichat',
    description: 'Proximity Chatrooms'
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <main>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}