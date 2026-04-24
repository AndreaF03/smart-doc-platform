# 📄 Smart Document Summarization Platform

A full-stack AI-powered web application that allows users to upload documents and generate intelligent summaries instantly.

---

## 🚀 Live Demo

* 🌐 Frontend: https://smart-doc-platform.vercel.app
* ⚙️ Backend: https://smart-doc-backend-j6lu.onrender.com

---

## ✨ Features

* 📂 Upload PDF, DOCX, and TXT files
* 🧠 AI-powered text summarization
* 📄 Extract text from documents
* 📥 Download summary as PDF
* ⚡ Fast and responsive UI
* 🌍 Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS
* Fetch API

### Backend

* Node.js
* Express.js
* Multer (file upload)
* PDF-Parse (PDF extraction)
* Mammoth (DOCX extraction)

### AI Integration

* Hugging Face Inference API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* GitHub (Version Control)

---

## ⚙️ How It Works

1. User uploads a document
2. Backend extracts text from the file
3. Extracted text is sent to AI model
4. AI generates a structured summary
5. Summary is displayed and can be downloaded as PDF

---

## 📂 Project Structure

```
smart-doc-platform/
│
├── client/        # React frontend
│
├── server/        # Node.js backend
│
└── README.md
```

---

## 🧪 Installation & Setup (Local)

### 1. Clone the repository

```
git clone https://github.com/AndreaF03/smart-doc-platform.git
cd smart-doc-platform
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create a `.env` file:

```
HF_TOKEN=your_huggingface_api_key
```

Run backend:

```
node index.js
```

---

### 3. Setup Frontend

```
cd client
npm install
npm start
```

---

## 🌐 Environment Variables

### Backend (.env)

```
HF_TOKEN=your_token_here
```

---

## 📸 Screenshots

(Add screenshots here later)

---

## 🔮 Future Improvements

* 🔐 User authentication (login/signup)
* 📊 Save history of summaries
* 🌙 Dark mode UI
* 💬 Chat with document
* 🌍 Multi-language support

---

## 🙌 Acknowledgements

* Hugging Face for AI models
* Vercel & Render for deployment

---

## 👤 Author

**Andrea Romson Fernandes**

* GitHub: https://github.com/AndreaF03
* LinkedIn: https://linkedin.com/in/andrea-fernandes03

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
