import { connectToDB } from "@/utils/database";
import Chat from "@/models/Chat";
import getAcceptableRanges from "@/utils/getAcceptableRanges";

export async function GET(request: Request, { params }: any) {
    const { range, latitude, longitude } = params
    try {
        await connectToDB()
        const geoRanges = getAcceptableRanges(parseFloat(range), parseFloat(latitude), parseFloat(longitude))

        const rangeChat = await Chat.find({
            latitude: { $gte: geoRanges.minLatitude, $lt: geoRanges.maxLatitude },
            longitude: { $gte: geoRanges.minLongitude, $lt: geoRanges.maxLongitude }
        }).limit(200).populate('author').sort({ createdAt: 'desc' })

        if (!rangeChat) return new Response("No chats found for this range", { status: 404 })

        return new Response(JSON.stringify(rangeChat), { status: 200 })
    } catch (err) {
        return new Response('Failed to fetch chats', { status: 500 })
    }
}