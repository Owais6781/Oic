
//import bodyParser from "body-parser"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import { ObjectId } from "mongodb";
import News from "./models/NewsModels.js";
import Publication from "./models/PublicationModels.js";
import About from "./models/About/AboutModels.js";
import AboutMember from "./models/About/AboutMemberModels.js";
import Legal from "./models/LegalModels.js";
import Activities from "./models/Activities/ActivitiesModels.js"
import ActivitiesConference from "./models/Activities/ActivitiesConferenceModels.js";
import AboutSession from "./models/Session/AboutSessionModels.js"
import SessionDocument from "./models/Session/SessionDocumentModels.js"
import Document from "./models/DocumentModels.js"
import Contact from "./models/ContactModels.js";



const app = express();
const PORT = 7000;

// ------------------- CORS ------------------- //
const accessPort = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: accessPort,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

;
// app.use(bodyParser.json());

app.use(express.json({ limit: "50mb", strict: false }))
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// ------------------- MongoDB ------------------- //
await mongoose.connect("mongodb://127.0.0.1:27017/OIC");
const db = mongoose.connection.db;
console.log("MongoDB Connected");

// GridFS Buckets
const newsBucket = new GridFSBucket(db, { bucketName: "newsFiles" });
const pubBucket = new GridFSBucket(db, { bucketName: "publicationFiles" });
const aboutBucket = new GridFSBucket(db, { bucketName: "AboutFiles" });
const aboutMemberBucket = new GridFSBucket(db, { bucketName: "AboutMemberFiles" });
const legalBucket = new GridFSBucket(db, { bucketName: "LegalFiles" });
const activitiesBucket = new GridFSBucket(db, { bucketName: "ActivitiesFiles" });
const sessiondocumentBucket = new GridFSBucket(db, { bucketName: "SessionDocumentFiles" });
const documentBucket = new GridFSBucket(db, { bucketName: "DocumentFiles" });

// ------------------- Multer ------------------- //
// const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

// ------------------- NEWS ROUTES ------------------- //



// Upload news
app.post("/news", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "documents", maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, details, category, date } = req.body;

    let imageFileId = null;
    if (req.files?.image?.length) {
      const uploadStream = newsBucket.openUploadStream(req.files.image[0].originalname);
      uploadStream.end(req.files.image[0].buffer);
      imageFileId = uploadStream.id;
    }

    let documentFileId = null;
    if (req.files?.documents?.length) {
      const uploadStream = newsBucket.openUploadStream(req.files.documents[0].originalname);
      uploadStream.end(req.files.documents[0].buffer);
      documentFileId = uploadStream.id;
    }

    const news = new News({ title, details, category, date, imageFileId, documentFileId });
    await news.save();

    res.json({ success: true, message: "News uploaded successfully", data: news });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});

// Get all news
app.get("/news", async (req, res) => {
  try {
    const allNews = await News.find();
    res.json({ success: true, data: allNews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// Get news by category
app.get("/news/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const news = await News.find({ category }).sort({ date: -1 });

    res.json({ success: true, data: news });
  } catch (err) {
    console.error("GET /news/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// Get single news by ID
// app.get("/news/:id", async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);
//     if (!news) return res.status(404).json({ success: false, message: "News not found" });
//     res.json({ success: true, data: news });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// Get single news by ID
app.get("/news/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: "News not found" });

    // Lookup filename from GridFS for document
    let document = null;
    if (news.documentFileId) {
      const file = await db.collection("newsFiles.files").findOne({ _id: news.documentFileId });
      document = {
        url: `/news/${news._id}/document`,
        name: file ? file.filename : "document.pdf",
      };
    }

    const response = {
      ...news.toObject(),
      imageUrl: news.imageFileId ? `/news/${news._id}/image` : null,
      document,
    };

    res.json({ success: true, data: response });
  } catch (err) {
    console.error("GET /news/:id ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




app.get("/news/:id/image", async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news || !news.imageFileId) return res.status(404).send("Image not found");

  const downloadStream = newsBucket.openDownloadStream(new ObjectId(news.imageFileId));
  downloadStream.pipe(res);
  downloadStream.on("error", () => res.status(404).send("File not found"));
});


/// Stream document file
app.get("/news/:id/document", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news || !news.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = newsBucket.openDownloadStream(new ObjectId(news.documentFileId));
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.delete("/news/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    // Optionally also delete the file from GridFS
    if (news.documentFileId) {
      await newsBucket.delete(new ObjectId(news.documentFileId)); // ✅ use newsBucket
    }
    if (news.imageFileId) {
      await newsBucket.delete(new ObjectId(news.imageFileId)); // ✅ delete image too if needed
    }

    res.json({ success: true, message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE /news/:id ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// Get archive year list
app.get("/archive", async (req, res) => {
  try {
    const years = await News.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: "$date" }
        }
      },
      {
        $group: {
          _id: { $year: "$dateObj" }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    const yearList = years.map(y => y._id);

    res.json({ success: true, data: yearList });
  } catch (err) {
    console.error("YEAR LIST ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});




app.get("/archive/:year", async (req, res) => {
  try {
    const year = parseInt(req.params.year);

    const news = await News.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: "$date" }
        }
      },
      {
        $match: {
          dateObj: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31T23:59:59.999Z`)
          }
        }
      },
      { $sort: { dateObj: -1 } }
    ]);

    res.json({ success: true, data: news });
  } catch (err) {
    console.error("ARCHIVE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});




// ------------------- PUBLICATION ROUTES ------------------- //

// Upload publication

app.post("/publication", upload.single("documents"), async (req, res) => {
  try {
    const { title, category, date } = req.body;

    let documentFileId = null;

    if (req.file) {

      const saveTitle = title.replace(/[^a-z0-9_\-]/gi, "_");
      const filename = `${saveTitle}`


      const uploadStream = pubBucket.openUploadStream(filename, {
        metadata: { originalName: req.file.originalname, title, category, date },
      });

      uploadStream.end(req.file.buffer);
      documentFileId = uploadStream.id; // ✅ ObjectId of file
    }

    const publication = new Publication({
      title,
      category,
      date,
      documentFileId,
    });

    await publication.save();

    res.json({
      success: true,
      message: "Publication uploaded successfully",
      data: publication,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});



/// Stream document file
app.get("/publication/:id/document", async (req, res) => {
  try {
    const publication = await publication.findById(req.params.id);
    if (!publication || !publication.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = pubBucket.openDownloadStream(new ObjectId(publication.documentFileId));
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});



// Get all publications
app.get("/publication", async (req, res) => {
  try {
    const allPublications = await Publication.find();
    res.json({ success: true, data: allPublications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get publication by ID
app.get("/publication/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ success: false, message: "Publication not found" });
    res.json({ success: true, data: publication });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Download publication file
app.get("/publication/download/:fileId", async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.fileId);
    const downloadStream = pubBucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).json({ success: false, message: "File not found" }));
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/publication/:id", async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ success: false, message: "Publication not found" });
    }

    // Optionally also delete the file from GridFS
    if (publication.documentFileId) {
      await pubBucket.delete(new ObjectId(publication.documentFileId));
    }

    res.json({ success: true, message: "Publication deleted successfully" });
  } catch (err) {
    console.error("DELETE /publication/:id ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ------------------- ABOUT ROUTES ------------------- //

app.post("/about", upload.single("documents"), async (req, res) => {
  try {
    const { title, details, category, } = req.body;

    let documentFileId = null;
    let documentFileName = null;

    if (req.file) {

      const saveTitle = title.replace(/[^a-z0-9_\-]/gi, "_");
      const filename = `${saveTitle}`


      const uploadStream = aboutBucket.openUploadStream(filename, {
        metadata: {
          originalName: req.file.originalname,
          title, category, details
        },
      });

      uploadStream.end(req.file.buffer);
      documentFileId = uploadStream.id;
      documentFileName = req.file.originalname

    }

    const aboutData = new About({
      title,
      category,
      details,
      documentFileId,
      documentFileName
    });

    await aboutData.save();

    res.json({
      success: true,
      message: "about uploaded successfully",
      data: aboutData,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});



app.get("/about/:id/document", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about || !about.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = aboutBucket.openDownloadStream(new ObjectId(about.documentFileId));
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});




app.get("/about", async (req, res) => {
  try {
    const allabout = await About.find();
    res.json({ success: true, data: allabout });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get About items by category
app.get("/about/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const aboutItems = await About.find({ category }).sort({ title: 1 });

    res.json({ success: true, data: aboutItems });
  } catch (err) {
    console.error("GET /about/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


app.get("/about/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: "Publication not found" });
    res.json({ success: true, data: about });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});







// ------------------- ABOUT  Commession Member ROUTES ------------------- //

app.post("/aboutMember", upload.single("documents"), async (req, res) => {
  try {
    const { title, details, category, } = req.body;

    let documentFileId = null;


    if (req.file) {

      const saveMember = category.replace(/[^a-z0-9_\-]/gi, "_");
      const filename = `${saveMember}`


      const uploadStream = aboutMemberBucket.openUploadStream(filename, {
        metadata: {
          originalName: req.file.originalname,
          title,
          category,
          details
        },
      });

      uploadStream.end(req.file.buffer);
      documentFileId = uploadStream.id;


    }

    const aboutData = new AboutMember({
      title,
      category,
      details,
      documentFileId,

    });

    await aboutData.save();

    res.json({
      success: true,
      message: "about uploaded successfully",
      data: aboutData,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});




app.get("/aboutMember", async (req, res) => {
  try {
    const allabout = await AboutMember.find();
    res.json({ success: true, data: allabout });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


app.get("/aboutMember/:id", async (req, res) => {
  try {
    const allabout = await AboutMember.findById(req.params.id);
    res.json({ success: true, data: allabout });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




app.get("/aboutMember/:id/document", async (req, res) => {
  try {
    const aboutMember = await AboutMember.findById(req.params.id);
    if (!aboutMember || !aboutMember.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = aboutMemberBucket.openDownloadStream(new ObjectId(aboutMember.documentFileId));
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});



// Get About items by category
app.get("/aboutMember/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const aboutItems = await AboutMember.find({ category }).sort({ title: 1 });

    res.json({ success: true, data: aboutItems });
  } catch (err) {
    console.error("GET /about/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ------------------- Legal Instrument ROUTES ------------------- //

app.post("/legal", upload.single("documents"), async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const safeTitle = title.replace(/[^a-z0-9_\-]/gi, "_");

    const uploadStream = legalBucket.openUploadStream(safeTitle, {
      metadata: {
        originalName: req.file.originalname,
        title,
        category,
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const legal = new Legal({
        title,
        category,
        documentFileId: uploadStream.id,
      });

      await legal.save();
      res.json({ success: true, data: legal });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.get("/legal/document/:id", async (req, res) => {
  try {
    const legal = await Legal.findById(req.params.id);
    if (!legal || !legal.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = legalBucket.openDownloadStream(new ObjectId(legal.documentFileId));
    res.set("Content-Type", "application/pdf"); // ✅ ensure inline PDF rendering
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.get("/legal", async (req, res) => {
  try {
    const data = await Legal.find();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// Get by ID
app.get("/legal/:id", async (req, res) => {
  try {
    const legal = await Legal.findById(req.params.id);
    if (!legal) return res.status(404).json({ success: false, message: "Legal not found" });
    res.json({ success: true, data: legal });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




app.get("/legal/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const legalItems = await Legal.find({ category }).sort({ title: 1 });

    res.json({ success: true, data: legalItems });
  } catch (err) {
    console.error("GET /legal/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// ------------------- Activities ROUTES ------------------- //




app.post("/activities", upload.single("documents"), async (req, res) => {
  try {
    const { title, category
      // ,details,date
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const safeTitle = title.replace(/[^a-z0-9_\-]/gi, "_");

    const uploadStream = activitiesBucket.openUploadStream(safeTitle, {
      metadata: {
        originalName: req.file.originalname,
        title,
        category,
        // details,date,
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const activities = new Activities({
        title,
        category,
        //details, date,
        documentFileId: uploadStream.id,
      });

      await activities.save();
      res.json({ success: true, data: activities });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.get("/activities/document/:id", async (req, res) => {
  try {
    const activities = await Activities.findById(req.params.id);
    if (!activities || !activities.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = activitiesBucket.openDownloadStream(new ObjectId(activities.documentFileId));
    res.set("Content-Type", "application/pdf"); // ✅ ensure inline PDF rendering
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});



app.get("/activities", async (req, res) => {
  try {
    const data = await Activities.find();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// Get by ID
app.get("/activities/:id", async (req, res) => {
  try {
    const activities = await Activities.findById(req.params.id);
    if (!activities) return res.status(404).json({ success: false, message: "activities not found" });
    res.json({ success: true, data: activities });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



app.get("/activities/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const activities = await Activities.find({ category }).sort({ title: 1 });

    res.json({ success: true, data: activities });
  } catch (err) {
    console.error("GET /activities/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// ------------------- Activities Conference & Meeting ------------------- //

app.post("/activitiesConference", async (req, res) => {
  try {
    const { title, details, date } = req.body;

    if (!title || !details || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const activitiesConference = new ActivitiesConference({
      title,
      details,
      date,
    });

    await activitiesConference.save();

    res.json({
      success: true,
      message: "Conference activity added successfully",
      data: activitiesConference,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/activitiesConference", async (req, res) => {
  try {
    const data = await ActivitiesConference.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// Get by ID
app.get("/activitiesConference/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await ActivitiesConference.findById(id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.json({
      success: true,
      data: activity,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});






// ------------------- Session  & About Session ------------------- //

app.post("/aboutSession", async (req, res) => {
  try {
    const { title, details, date } = req.body;

    if (!title || !details || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const AboutSessionData = new AboutSession({
      title,
      details,
      date
    });

    await AboutSessionData.save();

    res.json({
      success: true,
      message: "About Session added successfully",
      data: AboutSessionData,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/aboutSession", async (req, res) => {
  try {
    const data = await AboutSession.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



//Get by ID
app.get("/aboutSession/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const aboutSessiondData = await AboutSession.findById(id);

    if (!aboutSessiondData) {
      return res.status(404).json({
        success: false, message: "about Session not found",
      });
    }
    res.json({ success: true, data: aboutSessiondData, });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", });
  }
});






// ------------------- Session  & Session Document ------------------- //

app.post("/SessionDocument", upload.single("documents"), async (req, res) => {
  try {
    const { title, details, date, filename } = req.body;

    // if (!title || !filename) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }


    let documentFileId = null;

    if (req.file) {

      const saveTitle = filename.replace(/[^a-z0-9_\-]/gi, "_");
      const Newname = `${saveTitle}`


      const uploadStream = sessiondocumentBucket.openUploadStream(Newname, {
        metadata: { originalName: req.file.originalname, title, details, date, filename },
      });

      uploadStream.end(req.file.buffer);
      documentFileId = uploadStream.id; // ✅ ObjectId of file
    }

    const sessionDocument = new SessionDocument({
      title,
      details,
      date,
      filename,
      documentFileId
    });

    await sessionDocument.save();

    res.json({
      success: true,
      message: "Session Document n added successfully",
      data: sessionDocument,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





app.get("/SessionDocument/:id/document", async (req, res) => {
  try {
    const SessionDocument = await SessionDocument.findById(req.params.id);
    if (!SessionDocument || !SessionDocument.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = sessiondocumentBucket.openDownloadStream(new ObjectId(SessionDocument.documentFileId));
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});






app.get("/SessionDocument", async (req, res) => {
  try {
    const data = await SessionDocument.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



//Get by ID
app.get("/SessionDocument/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sessionDocument = await SessionDocument.findById(id);

    if (!sessionDocument) {
      return res.status(404).json({
        success: false, message: "Session Document not found",
      });
    }
    res.json({ success: true, data: sessionDocument, });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", });
  }
});





// ------------------- Document ROUTES ------------------- //

app.post("/documentSection", upload.single("documents"), async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const safeTitle = title.replace(/[^a-z0-9_\-]/gi, "_");

    const uploadStream = documentBucket.openUploadStream(safeTitle, {
      metadata: {
        originalName: req.file.originalname,
        title,
        category,
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const document = new Document({
        title,
        category,
        documentFileId: uploadStream.id,
      });

      await document.save();
      res.json({ success: true, data: document });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.get("/documentSection/document/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || !document.documentFileId) return res.status(404).send("Document not found");

    const downloadStream = documentBucket.openDownloadStream(new ObjectId(document.documentFileId));
    res.set("Content-Type", "application/pdf");
    downloadStream.pipe(res);
    downloadStream.on("error", () => res.status(404).send("File not found"));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


// Get by all Data
app.get("/documentSection", async (req, res) => {
  try {
    const data = await Document.find();
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// Get by ID
app.get("/documentSection/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, message: "Legal not found" });
    res.json({ success: true, data: document });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




app.get("/documentSection/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const documentItems = await Document.find({ category }).sort({ title: 1 });

    res.json({ success: true, data: documentItems });
  } catch (err) {
    console.error("GET /document/category/:category ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});




app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
 

    const ContacData = new Contact({
      name, email, subject, message
    })
    await ContacData.save()
    res.status(201).json({ success: true, message: "Contact  Added  succesfully", data: ContacData })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "Server Error" });
  }
})



app.get("/contact", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json({ success: true, data }); 
  } catch (err) { 
     res.status(500).json({ message: "Server error" })
  }
})



app.get("/contact/:id", async (req, res) => {
  try {
    const data = await Contact.findById(req.params.id);
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});



// ------------------- START SERVER ------------------- //
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
