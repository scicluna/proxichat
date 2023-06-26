import { connectToDB } from "@/utils/database"
import User from "@/models/User"

export async function POST(req: Request) {
    const parsedReq = await req.json()
    const { email, newLocation } = parsedReq

    try {
        await connectToDB()
        const user = await User.findOne({
            email: email
        })
        user.latitude = newLocation.latitude
        user.longitude = newLocation.longitude
        user.online = true
        await user.save()
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        return new Response('Failed to update location', { status: 500 })
    }
}