import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }
    try {
        if (!process.env.MONGODB_URI) return alert("DB not Found")
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'proxichat',
        })
        isConnected = true
        console.log("MongoDB connected")
    } catch (err) {
        console.log(err)
    }
}