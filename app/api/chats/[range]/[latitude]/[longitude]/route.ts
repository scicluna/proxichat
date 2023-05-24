import { connectToDB } from "@/utils/database";
import Chat from "@/models/Chat";
import getAcceptableRanges from "@/utils/getAcceptableRanges";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userRange = parseInt(searchParams.get('range')!)
    const userLatitude = parseInt(searchParams.get('latitude')!)
    const userLongitude = parseInt(searchParams.get('longitude')!)

    try {
        await connectToDB()
        const geoRanges = getAcceptableRanges(userRange, userLatitude, userLongitude)

        const rangeChat = await Chat.find({
            latitude: { $gte: geoRanges.minLatitude, $lt: geoRanges.maxLatitude },
            longitude: { $gte: geoRanges.minLongitude, $lt: geoRanges.maxLongitude }
        }).populate('author')

        if (!rangeChat) return new Response("No chats found for this range", { status: 404 })

        return new Response(JSON.stringify(rangeChat), { status: 200 })
    } catch (err) {
        return new Response('Failed to fetch chats', { status: 500 })
    }
}