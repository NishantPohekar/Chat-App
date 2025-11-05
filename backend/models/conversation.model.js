import mongoose, { mongo } from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[
        {
            type : mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type : mongoose.Schema.ObjectId,
            ref : "Message",
            default: [],
        }
    ]

},{timestamps:true})

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;