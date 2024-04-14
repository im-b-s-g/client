/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState();
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pdfs");
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPdf = async (filename) => {
    try {
      const response = await axios.get(
        " http://localhost:3000/download-pdf/${filename}",
        {
          responseType: "blob", // Set response type to Blob
        }
      );

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      // Append the link to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Clean up resources
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleViewPdf = async (filename) => {
    try {
      window.open("http://localhost:3000/view-pdf/${filename}", "_blank");
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 ">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
        <div>
          <h2>Upload PDF File</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} accept=".pdf" />
            <button type="submit">Upload</button>
          </form>
        </div>

        <h2>PDFs</h2>
        <ul>
          {pdfs.map((pdf) => (
            <div>
              <li
                key={pdf.filename}
                onClick={() => handleDownloadPdf(pdf.filename)}
              >
                {pdf.filename}
              </li>
              <button onClick={() => handleViewPdf(pdf.filename)}>
                View PDF
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default App;
