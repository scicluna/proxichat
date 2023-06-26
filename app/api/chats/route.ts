import { connectToDB } from "@/utils/database";
import Chat from "@/models/Chat";

export async function POST(req: Request) {
    const parsedReq = await req.json()
    const { session, text, location, tempId } = parsedReq

    try {
        await connectToDB()
        const response = await Chat.create({
            tempId: tempId,
            author: session.user.id,
            latitude: location.latitude,
            longitude: location.longitude,
            chatbody: text
        })
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (err) {
        return new Response('Failed to post chat', { status: 500 })
    }
}