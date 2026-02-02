// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const NewsEdit: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<any>({
//     title: "",
//     details: "",
//     category: "",
//     date: ""
//   });

//   const [existingImage, setExistingImage] = useState("");
//   const [existingDocs, setExistingDocs] = useState<any[]>([]);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [documents, setDocuments] = useState<File[]>([]);
//   const [success, setSuccess] = useState("");

  
//   useEffect(() => {
//     if (!id) return;

//    axios.get(`http://localhost:7000/news/${id}`)
//    .then((res) => {
//       const d = res.data.data;
//       if (!d) return;

//       setFormData({
//         title: d.title || "",
//         details: d.details || "",
//         category: d.category || "",
//         date: d.date || ""
//       });

//       setExistingImage(d.image || "");
//       setExistingDocs(d.documents || []);
//     });
//   }, [id]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const FD = new FormData();
//     FD.append("title", formData.title);
//     FD.append("details", formData.details);
//     FD.append("category", formData.category);
//     FD.append("date", formData.date);

 
//     FD.append("existingDocs", JSON.stringify(existingDocs));

//     if (imageFile) FD.append("image", imageFile);
//     documents.forEach((file) => FD.append("documents",file));

//     const res = await axios.put(`http://localhost:7000/news/${id}`,FD);

//     if (res.data.success) {
//       setSuccess("Updated Successfully!");
//       setTimeout(() => setSuccess(""), 2000);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6 mt-10"
//     >
//       <h2 className="text-3xl font-bold text-center">Edit News</h2>

//       {success && (
//         <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
//           {success}
//         </div>
//       )}

   
//       <div>
//         <label className="font-semibold block mb-1">Title</label>
//         <textarea
//           value={formData.title}
//           onChange={(e) =>
//             setFormData({ ...formData, title: e.target.value })
//           }
//           className="w-full border p-3 rounded-lg bg-gray-50 min-h-[60px]"
//         />
//       </div>

//       {/* Details */}
//       <div>
//         <label className="font-semibold block mb-1">Details</label>
//         <textarea
//           value={formData.details}
//           onChange={(e) =>
//             setFormData({ ...formData, details: e.target.value })
//           }
//           className="w-full border p-3 rounded-lg bg-gray-50 min-h-[120px]"
//         />
//       </div>

 
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="font-semibold block mb-1">Category</label>
//           <select
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             className="w-full border p-3 rounded-lg bg-gray-50"
//           >
//             <option value="">Select Category</option>
//             <option value="News">News</option>
//             <option value="Conferences & Meetings">Conferences & Meetings</option>
//             <option value="Palestine">Palestine</option>
//             <option value="Islamophobia / Muslim Minorities">
//               Islamophobia / Muslim Minorities
//             </option>
//             <option value="Right to Development">Right to Development</option>
//             <option value="Rights of Women & Child">
//               Rights of Women & Child
//             </option>
//             <option value="Right to Education">Right to Education</option>
//           </select>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Date</label>
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) =>
//               setFormData({ ...formData, date: e.target.value })
//             }
//             className="w-full border p-3 rounded-lg bg-gray-50"
//           />
//         </div>
//       </div>

//       {/* Upload New Image */}
//       <div>
//         <label className="font-semibold block mb-1">Upload New Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//           className="w-full border p-2 rounded-lg"
//         />

//         {imageFile && (
//           <div className="text-sm mt-2 bg-gray-200 p-2 rounded-lg">
//             {imageFile.name}
//           </div>
//         )}
//       </div>

//       {/* Existing Image */}
//       <div>
//         <label className="font-semibold block mb-1">Existing Image</label>
//         {existingImage ? (
//           <div className="flex items-center gap-4">
//             <img
//               src={`data:image/*;base64,${existingImage}`}
//               className="w-28 rounded shadow"
//             />
//             <button
//               type="button"
//               className="text-red-600 font-semibold"
//               onClick={() => setExistingImage("")}
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500">No image</p>
//         )}
//       </div>

//       {/* Upload New Documents */}
//       <div>
//         <label className="font-semibold block mb-1">Upload New Documents</label>
//         <input
//           type="file"
//           multiple
//           accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
//           onChange={(e) =>
//             setDocuments((prev) => [...prev, ...Array.from(e.target.files || [])])
//           }
//           className="w-full border p-2 rounded-lg"
//         />

//         {/* List newly added docs */}
//         {documents.length > 0 && (
//           <div className="mt-3 space-y-2">
//             {documents.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between bg-gray-100 p-2 rounded-lg"
//               >
//                 <span>{file.name}</span>
//                 <button
//                   type="button"
//                   className="text-red-600"
//                   onClick={() => {
//                     const updated = [...documents];
//                     updated.splice(index, 1);
//                     setDocuments(updated);
//                   }}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Existing Documents */}
//       <div>
//         <label className="font-semibold block mb-1">Existing Documents</label>

//         {existingDocs.length > 0 ? (
//           <div className="space-y-2">
//             {existingDocs.map((doc, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between bg-gray-100 p-2 rounded-lg"
//               >
//                 <a
//                   href={`data:application/octet-stream;base64,${doc.data}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-700 underline"
//                 >
//                   {doc.name}
//                 </a>

//                 <button
//                   type="button"
//                   className="text-red-600"
//                   onClick={() => {
//                     const updated = [...existingDocs];
//                     updated.splice(i, 1);
//                     setExistingDocs(updated);
//                   }}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No documents</p>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between pt-4">
//         <button
//           type="button"
//           className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//           onClick={() => navigate(-1)}
//         >
//           Back
//         </button>

//         <button
//           type="submit"
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Update
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NewsEdit;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Document {
  name: string;
  data: string;
}

const NewsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    category: "",
    date: "",
  });

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [existingDocs, setExistingDocs] = useState<Document[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newDocuments, setNewDocuments] = useState<File[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch existing news
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:7000/news/${id}`)
      .then((res) => {
        const data = res.data.data;
        if (!data) return;

        setFormData({
          title: data.title || "",
          details: data.details || "",
          category: data.category || "",
          date: data.date ? data.date.split("T")[0] : "",
        });

        setExistingImage(data.image || null);
        setExistingDocs(data.documents || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const FD = new FormData();
    FD.append("title", formData.title);
    FD.append("details", formData.details);
    FD.append("category", formData.category);
    FD.append("date", formData.date);

    // Append new image if uploaded
    if (imageFile) FD.append("image", imageFile);

    // Append new documents if uploaded
    newDocuments.forEach((file) => FD.append("documents", file));

    // Append existing documents as JSON
    FD.append("existingDocs", JSON.stringify(existingDocs));

    try {
      const res = await axios.put(`http://localhost:7000/news/${id}`, FD);
      if (res.data.success) {
        setSuccessMsg("News updated successfully!");
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6 mt-10"
    >
      <h2 className="text-3xl font-bold text-center">Edit News</h2>

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-3 rounded text-center">
          {successMsg}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="font-semibold block mb-1">Title</label>
        <textarea
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border p-3 rounded-lg bg-gray-50 min-h-[60px]"
        />
      </div>

      {/* Details */}
      <div>
        <label className="font-semibold block mb-1">Details</label>
        <textarea
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          className="w-full border p-3 rounded-lg bg-gray-50 min-h-[120px]"
        />
      </div>

      {/* Category & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold block mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border p-3 rounded-lg bg-gray-50"
          >
            <option value="">Select Category</option>
            <option value="News">News</option>
            <option value="Conferences & Meetings">Conferences & Meetings</option>
            <option value="Palestine">Palestine</option>
            <option value="Islamophobia / Muslim Minorities">Islamophobia / Muslim Minorities</option>
            <option value="Right to Development">Right to Development</option>
            <option value="Rights of Women & Child">Rights of Women & Child</option>
            <option value="Right to Education">Right to Education</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border p-3 rounded-lg bg-gray-50"
          />
        </div>
      </div>

      {/* Existing Image */}
      <div>
        <label className="font-semibold block mb-1">Existing Image</label>
        {existingImage ? (
          <div className="flex items-center gap-4">
            <img
              src={`data:image/jpeg;base64,${existingImage}`}
              alt="Existing"
              className="w-28 rounded shadow"
            />
            <button
              type="button"
              className="text-red-600 font-semibold"
              onClick={() => setExistingImage(null)}
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No image</p>
        )}
      </div>

      {/* Upload New Image */}
      <div>
        <label className="font-semibold block mb-1">Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded-lg"
        />
        {imageFile && <div className="text-sm mt-2 bg-gray-200 p-2 rounded-lg">{imageFile.name}</div>}
      </div>

      {/* Existing Documents */}
      <div>
        <label className="font-semibold block mb-1">Existing Documents</label>
        {existingDocs.length > 0 ? (
          <div className="space-y-2">
            {existingDocs.map((doc, index) => {
              const fileExt = doc.name.split(".").pop()?.toLowerCase();
              const mime = fileExt === "pdf" ? "application/pdf" : "application/octet-stream";

              return (
                <div key={index} className="flex justify-between bg-gray-100 p-2 rounded-lg">
                  <a
                    href={`data:${mime};base64,${doc.data}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    {doc.name}
                  </a>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => {
                      const updated = [...existingDocs];
                      updated.splice(index, 1);
                      setExistingDocs(updated);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No documents</p>
        )}
      </div>

      {/* Upload New Documents */}
      <div>
        <label className="font-semibold block mb-1">Upload New Documents</label>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
          onChange={(e) =>
            setNewDocuments((prev) => [...prev, ...Array.from(e.target.files || [])])
          }
          className="w-full border p-2 rounded-lg"
        />

        {newDocuments.length > 0 && (
          <div className="mt-3 space-y-2">
            {newDocuments.map((file, index) => (
              <div key={index} className="flex justify-between bg-gray-100 p-2 rounded-lg">
                <span>{file.name}</span>
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => {
                    const updated = [...newDocuments];
                    updated.splice(index, 1);
                    setNewDocuments(updated);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default NewsEdit;
