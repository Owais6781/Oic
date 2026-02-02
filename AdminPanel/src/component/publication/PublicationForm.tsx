import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Publication: React.FC = () => {

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL


  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
  });



  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("title", formData.title);
    FD.append("category", formData.category);
    FD.append("date", formData.date);

if (documentFile) {
      FD.append("documents", documentFile);
    }


    // const res = await fetch("http://localhost:7000/publication", {
    // const res = await fetch(`${API}/publication`, {
    //   method: "POST",
    //   body: FD,
    // });


     await axios.post(`${API}/publication`, FD, {
    headers: { "Content-Type": "multipart/form-data" }
  });

    alert("Publication Added Successfully!");
    navigate("/publicationTable");


  }

  const categories = ["OIC Publication", "Other Publication"];

  return (
    <form
      onSubmit={handleSubmit}
      // className="max-w-4xl mx-auto bg-white shadow-lg p-6 md:p-10 rounded-2xl mt-6 md:mt-10 space-y-6"
      className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Publication
      </h2>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Title</label>
        <textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl shadow-sm  h-[165px] focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* CATEGORY + DATE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* DOCUMENT UPLOAD */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Upload Document</label>
        <input
          type="file"
          name="documents"
          accept=".pdf,.doc,.docx,.jpg,.png"
          // onChange={(e) => {
          //   if (e.target.files && e.target.files[0]) {
          //     setDocumentFile(e.target.files[0]);
          //   }
          // }}

            onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
          required
          className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm"
        />

        {documentFile && (
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mt-2 shadow-sm">
            <p className="text-gray-700">{documentFile.name}</p>
            <button
              type="button"
              onClick={() => setDocumentFile(null)}
              className="text-red-500 font-medium hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full md:w-auto px-6 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400"
        >
          Back
        </button>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Publication;


