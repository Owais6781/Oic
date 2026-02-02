
 import mongoose from "mongoose";


const AboutSessionSchema = new mongoose.Schema(
  {
    title: String,
    details: String,
    date: String,
     // category: String,
         // documentFileId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("AboutSession", AboutSessionSchema);
