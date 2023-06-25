import { PropsWithChildren } from "react"
import Provider from "@/components/Provider"
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
                    <main className="flex flex-col bg-gray-200 font-roboto" style={{ height: '100dvh' }}>
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}