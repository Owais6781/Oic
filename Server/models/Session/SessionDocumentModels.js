
import mongoose from "mongoose";


// const SessionDocumentSchema = new mongoose.Schema(
//     {
//         title: String,
//         details: String,
//         date: String,
//         filename: String,
//          documentFileId: mongoose.Schema.Types.ObjectId
//     },
//     { timestamps: true }
// );

// export default mongoose.model("SessionDocument", SessionDocumentSchema);


const SessionDocumentSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    details: { type: String, default: "" },
    date: { type: String, default: "" },
    filename: { type: String,default: "" },
    documentFileId: {
        type: mongoose.Schema.Types.ObjectId ,required: false
    }
},
    { timestamps: true })
export default mongoose.model("SessionDocument", SessionDocumentSchema);

