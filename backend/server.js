// require('dotenv').config();

// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const saveDir = path.join(__dirname, "saved-docs");
// if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);

// app.post("/save", (req, res) => {
//   const { filename, content } = req.body;
//   if (!filename || !content) return res.status(400).json({ error: "Missing data" });

//   const filepath = path.join(saveDir, filename + ".txt");
//   fs.writeFile(filepath, content, (err) => {
//     if (err) return res.status(500).json({ error: "Failed to save" });
//     res.json({ message: "Document saved" });
//   });
// });

// app.get("/load/:filename", (req, res) => {
//   const { filename } = req.params;
//   const filepath = path.join(saveDir, filename + ".txt");

//   if (!fs.existsSync(filepath)) return res.status(404).json({ error: "File not found" });

//   fs.readFile(filepath, "utf-8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Read error" });
//     res.json({ content: data });
//   });
// });

// app.listen(PORT, () => console.log(`✅ Backend running at https://real-time-doc-editor.vercel.app:${PORT}`));


// require('dotenv').config();

// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const mongoose = require("mongoose");  // <--- Mongoose Import Kiya

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // --------------------- MONGODB CONNECTION ---------------------
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // --------------------- FILE SYSTEM STORAGE ---------------------
// const saveDir = path.join(__dirname, "saved-docs");
// if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);

// app.post("/save", (req, res) => {
//   const { filename, content } = req.body;
//   if (!filename || !content) return res.status(400).json({ error: "Missing data" });

//   const filepath = path.join(saveDir, filename + ".txt");
//   fs.writeFile(filepath, content, (err) => {
//     if (err) return res.status(500).json({ error: "Failed to save" });
//     res.json({ message: "Document saved" });
//   });
// });

// app.get("/load/:filename", (req, res) => {
//   const { filename } = req.params;
//   const filepath = path.join(saveDir, filename + ".txt");

//   if (!fs.existsSync(filepath)) return res.status(404).json({ error: "File not found" });

//   fs.readFile(filepath, "utf-8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Read error" });
//     res.json({ content: data });
//   });
// });

// // --------------------- SERVER LISTEN ---------------------
// app.listen(PORT, () => console.log(`✅ Backend running at port: ${PORT}`));


require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Document = require("./models/document");  // <--- Document Model Import Kiya

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --------------------- MONGODB CONNECTION ---------------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --------------------- API Routes ---------------------

// Save Document to MongoDB
app.post("/save", async (req, res) => {
    const { filename, content } = req.body;
    if (!filename || !content) return res.status(400).json({ error: "Missing data" });

    try {
        let doc = await Document.findOne({ filename });
        if (doc) {
            doc.content = content;
            await doc.save();
            return res.json({ message: "Document updated" });
        } else {
            await Document.create({ filename, content });
            return res.json({ message: "Document saved" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database save error" });
    }
});

// Load Document from MongoDB
app.get("/load/:filename", async (req, res) => {
    const { filename } = req.params;

    try {
        const doc = await Document.findOne({ filename });
        if (!doc) return res.status(404).json({ error: "Document not found" });

        return res.json({ content: doc.content });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database read error" });
    }
});

// --------------------- SERVER LISTEN ---------------------
app.listen(PORT, () => console.log(`✅ Backend running at port: ${PORT}`));
