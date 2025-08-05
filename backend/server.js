
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const saveDir = path.join(__dirname, "saved-docs");
if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);

app.post("/save", (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) return res.status(400).json({ error: "Missing data" });

  const filepath = path.join(saveDir, filename + ".txt");
  fs.writeFile(filepath, content, (err) => {
    if (err) return res.status(500).json({ error: "Failed to save" });
    res.json({ message: "Document saved" });
  });
});

app.get("/load/:filename", (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(saveDir, filename + ".txt");

  if (!fs.existsSync(filepath)) return res.status(404).json({ error: "File not found" });

  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });
    res.json({ content: data });
  });
});

app.listen(PORT, () => console.log(`✅ Backend running at https://real-time-doc-editor.vercel.app:${PORT}`));
