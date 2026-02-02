
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const SessionDocumentForm: React.FC = () => {

//     const navigate = useNavigate();

//     const API = import.meta.env.VITE_API_URL


//     const [documentFile, setDocumentFile] = useState<File | null>(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         details: "",
//         date: "",
//         filename: ""

//     });


//     const handleChange = (e: any) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         const FD = new FormData();
//         FD.append("title", formData.title )
//         FD.append("details", formData.details ||"")
//         FD.append("date", formData.date ||"")
//         FD.append("filename", formData.filename ||"")

//         if (documentFile) {
//             FD.append("documents", documentFile )
//         }

//         await axios.post(`${API}/SessionDocument`, FD, {
//             headers: { "Content-Type": "multipart/form-data" }

//         })
//         // await axios.post(`${API}/SessionDocument`, {
//         //     title: formData.title,
//         //     details: formData.details,
//         //     date: formData.date,
//         //     filename: formData.filename

//         // });

//         alert("Session Document Added Successfully!");
//         navigate("/SessionDocTable");


//     }

//     // const categories = ["Seminars",
//     //     "Field Visits",
//     //    // "Conferences & Meetings"
//     //   ];


//     return (
//         <form
//             onSubmit={handleSubmit}
//             // className="max-w-4xl mx-auto bg-white shadow-lg p-6 md:p-10 rounded-2xl mt-6 md:mt-10 space-y-6"
//             className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
//         >
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
//                 Session Document
//             </h2>


//             <div className="space-y-2">
//                 <label className="text-gray-700 font-medium">Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border rounded-xl shadow-sm  "
//                 />
//                 {/* <textarea
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded-lg p-3 min-h-[120px]"
//                 /> */}
//             </div>

//             <div className="space-y-2">
//                 <label className="text-gray-700 font-medium">Details</label>
//                 <textarea
//                     name="details"
//                     value={formData.details}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 min-h-[165px]"
//                 />
//             </div>


//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* <div className="space-y-2">
//                     <label className="text-gray-700 font-medium">Category</label>
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 border rounded-xl shadow-sm "
//                     >
//                         <option value="">-- Select Category --</option>
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div> */}
//             </div>

//             <div className=" w-full space-y-2">
//                     <label className="text-gray-700 font-medium">Date</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="w-full p-3 border rounded-xl shadow-sm "
//                     />

//                     {/* <input type="text" placeholder="FileName"
//                         name="filename"
//                         value={formData.filename}
//                         onChange={handleChange} /> */}
//                 </div>


//             <div className="space-y-4">
               
//                     <div>
//                         <label className="text-gray-700 font-medium"> Document Filename</label>
//                         <input type="text" placeholder="FileName"
//                             name="filename"
//                             value={formData.filename}
//                             onChange={handleChange}
//                             className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm"
//                         />
//                     </div>
//                     <div>

//                         <label className="text-gray-700 font-medium">Upload Document</label>

//                         <input
//                             type="file"
//                             name="documents"
//                             accept=".pdf,.doc,.docx,.jpg,.png"
//                             onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
//                             className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm"
//                         />

//                         {documentFile && (
//                             <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mt-2 shadow-sm">
//                                 <p className="text-gray-700">{documentFile.name}</p>
//                                 <button
//                                     type="button"
//                                     onClick={() => setDocumentFile(null)}
//                                     className="text-red-500 font-medium hover:underline"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         )}
//                     </div>
                
//             </div>



//             <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
//                 <button
//                     type="button"
//                     onClick={() => navigate(-1)}
//                     className="w-full md:w-auto px-6 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400"
//                 >
//                     Back
//                 </button>

//                 <button
//                     type="submit"
//                     className="w-full md:w-auto px-6 py-2 bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default SessionDocumentForm;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SessionDocumentForm: React.FC = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    date: "",
    filename: ""
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("title", formData.title);
    FD.append("details", formData.details || "");
    FD.append("date", formData.date || "");
    FD.append("filename", formData.filename || "");

    documentFiles.forEach((file) => {
      FD.append("documents", file); // ✅ append multiple files
    });

    await axios.post(`${API}/SessionDocument`, FD, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Session Document Added Successfully!");
    navigate("/SessionDocTable");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Session Document
      </h2>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl shadow-sm"
        />
      </div>

      {/* Details */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 min-h-[165px]"
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl shadow-sm"
        />
      </div>

      {/* Filename */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Document Filename</label>
        <input
          type="text"
          placeholder="FileName"
          name="filename"
          value={formData.filename}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm"
        />
      </div>

      {/* Upload Multiple Documents */}
      <div className="space-y-2">
        <label className="text-gray-700 font-medium">Upload Documents</label>
        <input
          type="file"
          name="documents"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={(e) =>
            setDocumentFiles(Array.from(e.target.files || []))
          }
          className="w-full p-3 border rounded-xl bg-gray-50 shadow-sm"
        />

        {documentFiles.length > 0 && (
          <ul className="mt-2 space-y-1">
            {documentFiles.map((file, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">{file.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    setDocumentFiles(documentFiles.filter((_, i) => i !== idx))
                  }
                  className="text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
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

export default SessionDocumentForm;
