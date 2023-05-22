import { PropsWithChildren } from "react"
import Provider from "@/components/Provider"
import Navbar from "@/components/Navbar"

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html>
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