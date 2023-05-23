import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    chatbody: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const Chat = models.Chat || model("Chat", ChatSchema);
export default Chat