
import mongoose from "mongoose";


const ActivitiesSchema = new mongoose.Schema(
    {
        title: String,
        category: String,
        // details: String,
        // date: String,
        documentFileId: mongoose.Schema.Types.ObjectId
    },
    { timestamps: true }
);

export default mongoose.model("Activities", ActivitiesSchema);