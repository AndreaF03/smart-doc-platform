const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const axios = require("axios");
dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Home route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// Upload route
app.post("/api/upload", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "uploads", req.file.filename);
    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (ext === ".txt") {
      extractedText = fs.readFileSync(filePath, "utf8");
    } else if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      extractedText = "Unsupported file type";
    }

    res.json({
      message: "File uploaded & text extracted",
      text: extractedText.substring(0, 3000),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "No text provided" });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/sshleifer/distilbart-cnn-12-6",
      {
        inputs:
`Analyze this resume and give a clean professional summary with:
1. Candidate Name
2. Education
3. Top Skills
4. Key Projects
5. Certifications
6. 3-line professional profile

Resume:
${text.substring(0, 3000)}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      summary: response.data[0].summary_text
    });

  } catch (error) {
  console.log("ERROR:");
  console.log(error.response?.status);
  console.log(error.response?.data || error.message);

  res.status(500).json({ message: "Summarization failed" });
}
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});