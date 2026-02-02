

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Conference: React.FC = () => {
//     const navigate = useNavigate();
//     const API = import.meta.env.VITE_API_URL;

//     //   const [documentFile, setDocumentFile] = useState<File | null>(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         // category: "",
//         details: "",
//         date: "",
//     });





//     const handleChange = (e: React.ChangeEvent<any>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         debugger

//         const FD = new FormData();
//         FD.append("title", formData.title);
//         // FD.append("category", formData.category);
//         FD.append("details", formData.details);
//         FD.append("date", formData.date);

//         // ✅ Append file ONLY if allowed
//         // if (documentFile ) {
//         //   FD.append("documents", documentFile);
//         // }

//         await axios.post(`${API}/activitiesConference`, FD, {
//             // headers: { "Content-Type": "multipart/form-data" },
//         });

//         alert("Activities Added Successfully!");
//         navigate("/activitiesTbConference");
//     };

//     //   const categories = [
//     //     "Seminars",
//     //     "Field Visits",
//     //     "Conferences & Meetings",
//     //   ];

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
//         >
//             <h2 className="text-3xl font-semibold text-gray-800"> Conference & Meeting</h2>

//             {/* TITLE */}
//             <div className="space-y-2">
//                 <label className="font-medium text-gray-700">Title</label>
//                 <textarea
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded-lg p-3 min-h-[120px]"
//                 />
//             </div>

//             {/* DETAILS */}
//             <div className="space-y-2">
//                 <label className="font-medium text-gray-700">Details</label>
//                 <textarea
//                     name="details"
//                     value={formData.details}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 min-h-[380px]"
//                 />
//             </div>

//             {/* CATEGORY + DATE */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* <div className="space-y-2">
//           <label className="font-medium text-gray-700">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border rounded-xl shadow-sm"
//           >
//             <option value="">-- Select Category --</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div> */}

//                 <div className="space-y-2">
//                     <label className="font-medium text-gray-700">Date</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="w-full p-3 border rounded-xl shadow-sm"
//                     />
//                 </div>
//             </div>

//             {/* DOCUMENT UPLOAD */}
//             {/* <div className="space-y-2">
//                 <label className="font-medium text-gray-700">Upload Document</label>

//                 <input
//                     type="file"
//                     name="documents"
//                     accept=".pdf,.doc,.docx,.jpg,.png"

//                     onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
//                     className={`w-full p-3 border rounded-xl shadow-sm`}
//                 />

               
        

//                 {documentFile && (
//                     <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mt-2">
//                         <p className="text-gray-700">{documentFile.name}</p>
//                         <button
//                             type="button"
//                             onClick={() => setDocumentFile(null)}
//                             className="text-red-500 font-medium hover:underline"
//                         >
//                             Remove
//                         </button>
//                     </div>
//                 )}
//             </div> */}

//             {/* BUTTONS */}
//             <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
//                 <button
//                     type="button"
//                     onClick={() => navigate(-1)}
//                     className="px-6 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400"
//                 >
//                     Back
//                 </button>

//                 <button
//                     type="submit"
//                     className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default Conference;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Conference: React.FC = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${API}/activitiesConference`, {
      title: formData.title,
      details: formData.details,
      date: formData.date,
    });

    alert("Conference & Meeting Added Successfully!");
    navigate("/activitiesTbConference"); // ✅ fixed path
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
    >
      <h2 className="text-3xl font-semibold text-gray-800">
        Conference & Meeting
      </h2>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Title</label>
        <textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3 min-h-[120px]"
        />
      </div>

      {/* DETAILS */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 min-h-[380px]"
        />
      </div>

      {/* DATE */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl shadow-sm"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Conference;
