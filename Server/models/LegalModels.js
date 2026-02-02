
import mongoose from "mongoose";


const LegalSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
   
    documentFileId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("Legal", LegalSchema);