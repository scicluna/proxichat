import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/database";
import User from "@/models/User";

//add id to Session
declare module "next-auth" {
    interface Session {
        user?: {
            name?: string | null
            email?: string | null
            image?: string | null
            id?: string | null
            online?: boolean | null
        };
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }) {
            if (!session.user) return session

            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                // serverless -> lambda function -> dynamodb
                await connectToDB();
                // check if user already exists
                const userExists = await User.findOne({
                    email: profile!.email
                })
                // if not, create a new user and save it to DB
                if (!userExists) {
                    await User.create({
                        email: profile!.email,
                        username: profile!.name?.replace(" ", ""),
                        image: profile!.image,
                        online: true
                    })
                }
                return true;
            } catch (err) {
                console.log(err)
                return false;
            }
        }
    },
})

export { handler as GET, handler as POST }