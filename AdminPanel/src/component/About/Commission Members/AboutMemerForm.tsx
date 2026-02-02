
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AboutMemberForm: React.FC = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        title: "",
        details: "",
        category: "",
        // file_name:"",

    });
    const [documentFile, setDocumentFile] = useState<File | null>(null);

    const API = import.meta.env.VITE_API_URL;


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const FD = new FormData();
        FD.append("title", item.title);
        FD.append("details", item.details);
        FD.append("category", item.category);
        //   FD.append("file_name", item.category);

        if (documentFile) {
            FD.append("documents", documentFile);
        }

        await axios.post(`${API}/aboutMember`, FD, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert("About Member Added Successfully!");
        navigate(-1);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-8 space-y-6"
        >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Commission Members
            </h2>


            <div className="space-y-2">
                <label className="text-gray-700 font-medium">Title</label>
                {/* <textarea
          name="title"
          value={item.title}
          onChange={handleChange}
          
          className="w-full p-3 border rounded-xl shadow-sm h-[165px] focus:ring-2 focus:ring-blue-400"
        /> */}
                <input type="text"
                    name="title"
                    value={item.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl shadow-sm  focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="space-y-2">
                <label className="text-gray-700 font-medium">Details</label>
                <textarea
                    name="details"
                    value={item.details}
                    onChange={handleChange}

                    className="w-full p-3 border rounded-xl shadow-sm h-[165px] focus:ring-2 focus:ring-blue-400"
                />
            </div>


            <div>
                <label className="block font-semibold mb-2">Category</label>
                <select name="category" value={item.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3">
                    <option value="">-- Select Category --</option>
                    <option value="Commission Members">Commission Members</option>
                    <option value="IPHRC-Former Commission Members">IPHRC-Former Commission Members</option>
                    <option value="IPHRC-Secretariat">IPHRC-Secretariat</option>

                </select>
            </div>




            <div className="space-y-2">

                <label className="text-gray-700 font-medium">Upload Document</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
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
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AboutMemberForm;
