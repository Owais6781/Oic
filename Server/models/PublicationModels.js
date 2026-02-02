

import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    date: String,

 
    documentFileId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("Publication", PublicationSchema);
