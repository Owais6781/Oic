

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import multer from "multer";
// import News from "./models/NewsModels.js";
// import Publication  from "./models/PublicationModels.js"

// const app = express();
// const accessPort = [
//   "http://localhost:5173",
//   "http://localhost:5174",
// ]



// app.use(cors({
//   origin: accessPort,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());
// const PORT = 7000;

// mongoose.connect("mongodb://127.0.0.1:27017/OIC");
// console.log("MongoDB Connected");


// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
//   fileFilter: (req, file, cb) => {
//     cb(null, true);
//   }
// });


// app.post("/news",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "documents", maxCount: 1 }
//   ]),
//   async (req, res) => {
//     try {
//       const { title, details, category, date } = req.body;


//       console.log("REQ.BODY:", req.body);
//       console.log("REQ.FILES:", req.files);


//       let imageBase64 = "";
//       if (req.files?.image?.length > 0) {
//         imageBase64 = req.files.image[0].buffer.toString("base64");
//       }

//       let documents = [];
//       if (req.files?.documents?.length > 0) {
//         documents = req.files.documents.map((doc) => ({
//           name: doc.originalname,
//           data: doc.buffer.toString("base64")
//         }));
//       }

//       const news = new News({
//         title, details, category, date,
//         image: imageBase64,
//         documents
//       });

//       await news.save();
//       res.json({ success: true, message: "News added successfully" });
//     } catch (err) {
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
//   }
// );

// app.get("/news", async (req, res) => {
//   try {
//     const allNews = await News.find(req.params)

//     res.json({ success: true, data: allNews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });


// app.get("/news/:id", async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);
//     if (!news) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }
//     res.json({ success: true, data: news });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });


// app.put("/news/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "documents", maxCount: 1 }
//   ]),
//   async (req, res) => {
//     try {
//       const { title, details, category, date } = req.body;

//       const news = await News.findById(req.params.id);
//       if (!news) {
//         return res.status(404).json({ success: false, message: "News not found" });
//       }

//       news.title = title || news.title;
//       news.details = details || news.details;
//       news.category = category || news.category;
//       news.date = date || news.date;

//       if (req.files.image) {
//         news.image = req.files.image[0].buffer.toString("base64");
//       }

//       if (req.files.documents) {
//         const newDocs = req.files.documents.map((doc) => ({
//           name: doc.originalname,
//           data: doc.buffer.toString("base64")
//         }));

//         news.documents = [...news.documents, ...newDocs];
//       }

//       await news.save();

//       res.json({ success: true, message: "News updated successfully" });
//     } catch (err) {
//       res.status(500).json({ success: false, message: "Server Error" });
//     }
//   }
// );


// //*******************Publication  Post*********************//


// // app.post(
// //   "/publication",
// //   upload.single("documents"), 
// //   async (req, res) => {
// //     try {
// //       const { title,  category, date } = req.body;

// //       let documentData = null;

// //       if (req.file) {
// //         documentData = {
// //           name: req.file.originalname,
// //           data: req.file.buffer.toString("base64"),
// //         };
// //       }

// //       const publication = new Publication({
// //         title,
// //         category,
// //         date,
// //         documents: documentData,  
// //       });

// //       await publication.save();

// //       res.json({
// //         success: true,
// //         message: "News added successfully (document uploaded)",
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({
// //         success: false,
// //         message: "Server Error",
// //       });
// //     }
// //   }
// // );



// app.post(
//   "/publication",
//   upload.single("documents"),
//   async (req, res) => {
//     try {
     

//       const { title, category, date } = req.body;

//       if (!title) {
//         throw new Error("Title is missing!");
//       }

//       let documentData = null;

//       if (req.file) {
//         // const ext = path.extname(req.file.originalname || "");
//         const cleanTitle = title.replace(/\s+/g, " ") || "Untitled";
//         const fileName = `${cleanTitle}`;

//         documentData = {
//           name: fileName,
//           data: req.file.buffer.toString("base64"),
//         };
//       }

//       const publication = new Publication({
//         title,
//         category,
//         date,
//         documents: documentData,
//       });

//       await publication.save();

//       res.json({
//         success: true,
//         message: "Publication added successfully",
//         data: publication,
//       });
//     } catch (err) {
//       console.error("SERVER ERROR:", err);
//       res.status(500).json({
//         success: false,
//         message: "Server Error",
//         error: err.message,
//       });
//     }
//   }
// );


// //*******************Publication  Get  *********************//

// app.get("/publication", async (req, res) => {
//   try {
//     const allpublication= await Publication.find(req.params)

//     res.json({ success: true, data: allpublication });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });


// //******************* Publication  Get by Id  *********************//

// app.get("/publication/:id", async (req, res) => {
//   try {
//     const allpublication = await Publication.findById(req.params.id);
//     if (!allpublication) {
//       return res.status(404).json({ success: false, message: "allpublication not found" });
//     }
//     res.json({ success: true, data: allpublication });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
