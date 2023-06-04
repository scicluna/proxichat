import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params }: Params) {
    const { id } = params

    await connectToDB();
    try {
        const user = await User.findById(id);

        if (!user) return new Response("User not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        return new Response('Failed to fetch users', { status: 500 });
    };
};