import { connectToDB } from "@/utils/database"
import User from "@/models/User"
import { Location } from "@/utils/useGeoLocation"
import { NextApiRequest } from "next"
import { parse } from "path"

export async function POST(req: any) {
    const parsedReq = await req.json()
    const { email, location } = parsedReq

    try {
        console.log(email)
        await connectToDB()
        const user = await User.findOne({
            email: email
        })

        console.log(user)

        user.latitude = location.latitude
        user.longitude = location.longitude
        await user.save()
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        return new Response('Failed to update location', { status: 500 })
    }
}