import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    const res = await fetch("https://smart-doc-backend-j6lu.onrender.com/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    setMessage(data.message);
    setText(data.text);
    setSummary("");
  };

  const summarizeText = async () => {
    setLoading(true);

    const res = await fetch("https://smart-doc-backend-j6lu.onrender.com/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    setSummary(data.summary);
    setLoading(false);
  };
  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Summary Report", 20, 20);

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(summary, 170);
  doc.text(lines, 20, 35);

  doc.save("summary-report.pdf");
};
  return (
    <div className="app">
      <div className="card">
        <h1>📄 Smart Document Platform</h1>
        <p>Upload documents and get AI summaries instantly.</p>

        <div
  className="drop-zone"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  }}
  onClick={() => document.getElementById("fileInput").click()}
>
  {file
    ? `📄 ${file.name}`
    : "📂 Drag & Drop file here or Click to Browse"}
</div>

<input
  id="fileInput"
  type="file"
  style={{ display: "none" }}
  onChange={(e) => setFile(e.target.files[0])}
/>

        <div className="btn-group">
          <button onClick={uploadFile}>Upload File</button>
          <button onClick={summarizeText}>Summarize</button>
          {summary && (
  <button onClick={downloadPDF}>
    Download PDF
  </button>
)}
        </div>

        <p className="msg">{message}</p>

        {loading && <p className="loading">Generating summary...</p>}

        {text && (
          <div className="box">
            <h3>Extracted Text</h3>
            <textarea value={text} readOnly />
          </div>
        )}

        {summary && (
          <div className="box">
            <h3>AI Summary</h3>
            <textarea value={summary} readOnly />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;