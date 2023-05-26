import { connectToDB } from "@/utils/database"
import User from "@/models/User"

export async function POST(req: Request) {
    const parsedReq = await req.json()
    const { session } = parsedReq

    console.log(session)
    try {
        await connectToDB()
        const user = await User.findOne({
            email: session.user.email
        })

        user.online = false
        await user.save()
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        return new Response('Failed to update location', { status: 500 })
    }
}