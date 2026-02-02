// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const languagesList = [
//   { code: "en", label: "English" },
//   { code: "ar", label: "Arabic" },
//   { code: "fr", label: "French" }
// ];
// const languageNames: any = {
//   en: { en: "English", ar: "Arabic", fr: "French" },
//   ar: { en: "English", ar: "Arabic", fr: "French" },
//   fr: { en: "English", ar: "Arabic", fr: "French" }
// };


// const NewsForm: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     details: "",
//     category: "",
//     date: ""
//   });

//   const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [documentFiles, setDocumentFiles] = useState<File[]>([]);

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLanguageToggle = (code: string) => {
//     if (selectedLanguage === code) return;
//     setSelectedLanguage(code);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const titleObj = {
//       en: selectedLanguage === "en" ? formData.title : "",
//       ar: selectedLanguage === "ar" ? formData.title : "",
//       fr: selectedLanguage === "fr" ? formData.title : ""
//     };

//     const detailsObj = {
//       en: selectedLanguage === "en" ? formData.details : "",
//       ar: selectedLanguage === "ar" ? formData.details : "",
//       fr: selectedLanguage === "fr" ? formData.details : ""
//     };

//     const categoryObj = {
//       en: selectedLanguage === "en" ? formData.category : "",
//       ar: selectedLanguage === "ar" ? formData.category : "",
//       fr: selectedLanguage === "fr" ? formData.category : ""
//     };

//     const FD = new FormData();
//     FD.append("title", JSON.stringify(titleObj));
//     FD.append("details", JSON.stringify(detailsObj));
//     FD.append("category", JSON.stringify(categoryObj));
//     FD.append("date", formData.date);

//     const imageLangObj = {
//       en: selectedLanguage === "en",
//       ar: selectedLanguage === "ar",
//       fr: selectedLanguage === "fr"
//     };

//     const documentLangObj = {
//       en: selectedLanguage === "en",
//       ar: selectedLanguage === "ar",
//       fr: selectedLanguage === "fr"
//     };

//     FD.append("imageLang", JSON.stringify(imageLangObj));
//     FD.append("documentLang", JSON.stringify(documentLangObj));
//     FD.append("selectedLang", selectedLanguage);

//     if (imageFile) FD.append("image", imageFile);
//     documentFiles.forEach((file) => FD.append("documents", file));

//     const res = await fetch("http://localhost:5000/api/news", {
//       method: "POST",
//       body: FD
//     });

//     if (res.ok) {
//       alert("News Added Successfully!");
//       navigate("/");
//     } else {
//       alert("Error occurred.");
//     }
//   };

//   // tis is for label based on language  selection
//   const labels: Record<string, any> = {
//     en: {
//       selectLanguage: "Select Language(en)",
//       title: "Title (en)",
//       details: "Details (en)",
//       category: "Category (en)",
//       date: "Date (en)",
//       uploadImage: "Upload Image (en)",
//       uploadDocs: "Upload Documents (en)",
//       back: "Back ",
//       submit: "Submit "
//     },

//     ar: {
//       selectLanguage: "Select Language (ar)",
//       title: "Title (ar)",
//       details: "Details (ar)",
//       category: "Category (ar)",
//       date: "Date (ar)",
//       uploadImage: "Upload Image (ar)",
//       uploadDocs: "Upload Documents(ar)",
//       back: "Back ",
//       submit: "Submit "
//     },

//     fr: {
//       selectLanguage: "Select Language(fr)",
//       title: "Title (fr)",
//       details: "Details (fr)",
//       category: "Category (fr)",
//       date: "Date (fr)",
//       uploadImage: "Upload Image (fr)",
//       uploadDocs: "Upload Documents (fr)",
//       back: "Back ",
//       submit: "Submit "
//     }
//   };


//   //this is for Category based on language selection.
//   const categoriesByLanguage: Record<string, { value: string; label: string }[]> = {
//     en: [
//       { value: "News", label: "News" },
//       { value: "Conferences & Meetings", label: "Conferences & Meetings" },
//       { value: "Palestine", label: "Palestine" },
//       { value: "Islam phobia / Muslim Minorities", label: "Islam phobia / Muslim Minorities" },
//       { value: "Right to Development", label: "Right to Development" },
//       { value: "Rights of Women & Child", label: "Rights of Women & Child" },
//       { value: "Right to Education", label: "Right to Education" },

//     ],

//     ar: [
//       { value: "News", label: "News" },
//       { value: "Conferences & Meetings,", label: "Conferences & Meetings" },
//       { value: "Palestine", label: "Palestine" },
//       { value: "Islam phobia / Muslim Minorities", label: "Islam phobia / Muslim Minorities" },
//       { value: "Right to Development", label: "Right to Development" },
//       { value: "Rights of Women & Child,", label: "Rights of Women & Child" },
//       { value: "Right to Education,", label: "Right to Education," },
//     ],

//     fr: [
//       { value: "News", label: "News" },
//       { value: "Conferences & Meetings,", label: "Conferences & Meetings" },
//       { value: "Palestine", label: "Palestine" },
//       { value: "Islam phobia / Muslim Minorities", label: "Islam phobia / Muslim Minorities" },
//       { value: "Right to Development", label: "Right to Development" },
//       { value: "Rights of Women & Child,", label: "Rights of Women & Child" },
//       { value: "Right to Education,", label: "Right to Education," },
//     ]
//   };

//   const selectCategoryLabel: Record<string, string> = {
//     en: "Select Category",
//     ar: "Select Category",
//     fr: "Select Category"
//   };
//   const categoryOptions = categoriesByLanguage[selectedLanguage] || [];
//   <option value="">{selectCategoryLabel[selectedLanguage]}</option>

//   return (
//     <form className="form-container" onSubmit={handleSubmit} dir={selectedLanguage === "ar" ? "rtl" : "ltr"}

//     >
//       <h2>OIC News</h2>
//       <div className="form-group">
//         <label>{labels[selectedLanguage].selectLanguage}</label>
//         <div className="language-box">
//           {languagesList.map((lang) => (
//             <label
//               key={lang.code}
//               className={`lang-item ${selectedLanguage === lang.code ? "checked" : ""}`}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedLanguage === lang.code}
//                 onChange={() => handleLanguageToggle(lang.code)}
//               />
//               {languageNames[selectedLanguage][lang.code]}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="form-group">
//         <label>{labels[selectedLanguage].title}</label>
//         <div style={{
//           direction: selectedLanguage === "ar" ? "rtl" : "ltr",
//           textAlign: selectedLanguage === "ar" ? "right" : "left",
//         }}>
//           <textarea
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="title-textarea"

//             required
//           />
//         </div>
//       </div>

//       <div className="form-group" >
//         <label>{labels[selectedLanguage].details}</label>
//         <textarea
//           name="details"
//           value={formData.details}
//           onChange={handleChange}
//           className="details-textarea"
//           style={{
//             direction: selectedLanguage === "ar" ? "rtl" : "ltr",
//             textAlign: selectedLanguage === "ar" ? "right" : "left",
//           }}
//         />
//       </div>

//       <div className="row-2-fields">
//         <div className="form-group">
//           <label>{labels[selectedLanguage].category}</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           >
//             <option value="">{selectCategoryLabel[selectedLanguage]}</option>
//             {categoryOptions.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>{labels[selectedLanguage].date}</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//           />
//         </div>
//       </div>


//       <div className="form-group upload-row">
//         <label>{labels[selectedLanguage].uploadImage}</label>
//         <div className="upload-wrapper">
//           <input
//             id="imageInput"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files![0])}
//           />
//           {imageFile && (
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={() => {
//                 setImageFile(null);
//                 (document.getElementById("imageInput") as HTMLInputElement).value = "";
//               }}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="form-group upload-row">
//         <label>{labels[selectedLanguage].uploadDocs}</label>
//         <div className="upload-wrapper">
//           <input
//             id="docInput"
//             type="file"
//             multiple
//             accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
//             onChange={(e) =>
//               setDocumentFiles((prev) => [...prev, ...Array.from(e.target.files!)]
//               )}
//           />

//           {documentFiles.length > 0 && (
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={() => {
//                 setDocumentFiles([]);
//                 (document.getElementById("docInput") as HTMLInputElement).value = "";
//               }}
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         <div className="doc-list">
//           {documentFiles.map((file, index) => (
//             <div key={index} className="doc-item-row">
//               <p className="doc-item">{index + 1}. {file.name}</p>

//               <button
//                 type="button"
//                 className="doc-remove-btn"
//                 onClick={() => {
//                   const updated = [...documentFiles];
//                   updated.splice(index, 1);
//                   setDocumentFiles(updated);
//                 }}
//               >
//                 {labels[selectedLanguage].cancel}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="button-group">
//         <button type="button" className="back-btn" onClick={() => navigate(-1)}>
//           {labels[selectedLanguage].back}
//         </button>

//         <button type="submit" className="smt-button">{labels[selectedLanguage].submit}</button>
//       </div>
//     </form>
//   );
// };

// export default NewsForm;


import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    category: "",
    date: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);


 const API=import.meta.env.VITE_API_URL;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("details", formData.details);
    data.append("category", formData.category);
    data.append("date", formData.date);

    if (imageFile) data.append("image", imageFile);
    
    documentFiles.forEach((doc) => data.append("documents", doc));

    try {
      // await axios.post("http://localhost:7000/news", data,{
       await axios.post(`${API}/news`, data,{
      
        
      });
      alert("News Submitted Successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Upload Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6">

      <h2 className="text-3xl font-bold text-center mb-4">Add News</h2>

      <div>
        <label className="block font-semibold mb-2">Title</label>
        <textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select name="category" value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">
            <option value="">-- Select Category --</option>
            <option value="News">News</option>
              <option value="Activities">Activities</option>
            <option value="Palestine">Palestine</option>
            <option value="Right to Education">Right to Education</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files![0])}
           className="w-full border p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Upload Documents</label>

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
          onChange={(e) => setDocumentFiles([...documentFiles, ...Array.from(e.target.files!)])}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      <button type="submit" className="px-6 py-2 bg-blue-600 justify-center text-white rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default NewsForm;
