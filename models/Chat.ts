import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
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