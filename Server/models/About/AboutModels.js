
import mongoose from "mongoose";

const ABoutSchema = new mongoose.Schema(
  {
    title: String,
    details:String,
    category: String,
    documentFileId: mongoose.Schema.Types.ObjectId,
     documentFileName: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", ABoutSchema);
