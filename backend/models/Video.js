import mongoose from "mongoose";

const videoSchema =new mongoose.Schema(
    {
        imageUrl:{
            type:String,
            required:true,
        },
        videoUrl:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("Video", videoSchema);