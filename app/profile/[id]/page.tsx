import Navbar from "@/components/Navbar";

type OtherProfileProps = {
    params: {
        id: string
    }
}

export type User = {
    _id: string,
    email: string,
    username: string,
    ___v: number,
    latitude: number,
    longitude: number,
    online: boolean
    updatedAt: string
}

async function getUser(id: string) {
    const response = await fetch(`${process.env.URL}/api/profile/${id}`)
    return await response.json()
}

export default async function OtherProfile({ params }: OtherProfileProps) {
    const user = await getUser(params.id)

    function getDate(date: string) {
        const newDate = new Date(date)
        const i = newDate.getMinutes()
        const h = newDate.getHours()
        const y = newDate.getFullYear()
        const m = newDate.getMonth()
        const d = newDate.getDate()
        return `${m}/${d}/${y} at ${h}:${i}`
    }

    return (
        <>
            <Navbar />
            <section className="h-full overflow-y-scroll scrollbar-hide p-1 mx-1 shadow-md shadow-gray-300 bg-gray-100 relative">
                {!user ? (
                    <div className="h-full w-full flex flex-col justify-center items-center text-6xl mb-20 gap-5 text-center" >
                        <h1>User not found...</h1>
                    </div>
                ) : (
                    <>
                        <h1 className="font-bold text-2xl">{`${user.username}'s Profile`}</h1 >
                        <h1 className="text-xl">{user.online ? 'Currently Online' : `Last seen on ${getDate(user.updatedAt) || 'unknown'}`}</h1>
                        <h1 className="text-xl text-gray-500">More Coming Soon!</h1>
                    </>
                )
                }
            </section>
        </>
    )
}