import Image from "next/image"
import Link from "next/link"
import Profile from "./Profile"

export default function Navbar() {
    return (
        <>
            <nav className="h-12 p-1 px-1 flex justify-between bg-gray-200 shadow-md shadow-gray-300">
                <div className="flex">
                    <Link href={`/chatroom`}>
                        <Image src='/assets/images/proxichatlogo.webp' priority width={40} height={40} alt="logo" />
                    </Link>
                </div>
                <div className="h-10 right-1 w-full absolute flex flex-col justify-end items-end text-6xl mb-20 gap-5 text-center" >
                    <div className="rounded-full h-full w-10 bg-gray-500"></div>
                </div>
                <Profile />
            </nav>
        </>
    )
}