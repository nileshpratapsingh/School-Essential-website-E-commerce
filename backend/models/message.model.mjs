import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderName:{
            type: String,
            required:true,
        },
        senderPhone:{
            type:Number,
            required:true,
        },
        senderEmail:{
            type:String,
            required:true,
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Signup',
            required:false
        },

        message:{
            type:String,
            required:true,
        },

        messageType:{
            enum:['business','refund','complaint','feedback','contact']
        },

        createdAt:{
            type: Date,
            default:Date.now,
        },

        status:{
            enum:['read', 'notseen', 'deleted', 'draft']
        },
        userStatus:{
            enum:['user', 'anonymous']
        },
    },
    { timestamps: true } //  adds createdAt & updatedAt
);

const messages = mongoose.model("Message", messageSchema);


export default messages;
