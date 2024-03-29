import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import getAcceptableRanges from "@/utils/getAcceptableRanges";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params }: Params) {
    const { range, latitude, longitude } = params
    try {
        await connectToDB()
        const geoRanges = getAcceptableRanges(parseFloat(range), parseFloat(latitude), parseFloat(longitude))

        const users = await User.find({
            latitude: { $gte: geoRanges.minLatitude, $lt: geoRanges.maxLatitude },
            longitude: { $gte: geoRanges.minLongitude, $lt: geoRanges.maxLongitude }
        })
        if (!users) return new Response("No users found for this range", { status: 404 })

        const onlineUsers = users.filter(user => user.online == true)

        return new Response(JSON.stringify(onlineUsers), { status: 200 })
    } catch (err) {
        return new Response('Failed to fetch users', { status: 500 })
    }
}