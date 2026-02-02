// import mongoose from "mongoose";

// const newsSchema = new mongoose.Schema(
//   {
//     title: String,
//     details: String,
//     category: String,
//     date: String,

  
//     image: { type: String},

   
//     documents: [
//       {
//         name: String,
//         data: String
//       }
//     ]
//   },
//   { timestamps: true }
// );

// export default mongoose.model("News", newsSchema);



import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  category: String,
  date: String,
  imageFileId: mongoose.Schema.Types.ObjectId,     
  documentFileId: mongoose.Schema.Types.ObjectId,  
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
