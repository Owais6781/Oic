
import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
   
    documentFileId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("Document", DocumentSchema);