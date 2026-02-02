
import mongoose from "mongoose";

const AboutMemberSchema = new mongoose.Schema(
  {
   title:String,
    details:String,
    category: String,
    documentFileId: mongoose.Schema.Types.ObjectId,
    
  },
  { timestamps: true }
);

export default mongoose.model("AboutMember", AboutMemberSchema);
