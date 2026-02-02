import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SessionDocumentView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Session, setSession] = useState<any>(null);

    const API = import.meta.env.VITE_API_URL

    useEffect(() => {


        axios.get(`${API}/SessionDocument/${id}`)
            .then((res) => {
                setSession(res.data.data);
            });
    }, [id]);



    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this publication?")) {
            return;
        }

        try {
            await axios.delete(`${API}/SessionDocument/${id}`)
            // alert("publication Delete successfully")
            navigate(-1)

        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    }

    if (!Session)
        return (
            <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
        );

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 space-y-6">

            <h2 className="text-3xl font-bold text-center">Session Document View </h2>


            <div>
                <label className="block mb-1 text-gray-700 font-medium">Title</label>

                <input type="text"
                    readOnly
                    value={Session.title}
                    className="w-full border rounded-lg p-3  bg-gray-50"
                />

                {/* <textarea
                    name="title"
                    value={Session.title}
                    readOnly
                    className="w-full border rounded-lg p-3 min-h-[120px]"
                /> */}
            </div>


            <div>
                <label className="block mb-1 text-gray-700 font-medium">Details</label>
                <textarea
                    readOnly
                    value={Session.details}
                    className="w-full border rounded-lg p-3 min-h-[380px] bg-gray-50"
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Category</label>
          <input
            readOnly
            value={activities.category}
            className="w-full border rounded-lg p-3 bg-gray-50"
          />
        </div> */}



            </div>

            {/* 

            <div>
                <label className="block mb-1 text-gray-700 font-medium">Document</label>
                {activities.documentFileId ? (
                    <a
                        href={`${API}/activities/document/${activities._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 underline mt-2"
                    >
                        {"View / Download"}
                    </a>
                ) : (
                    <p className="text-gray-500">No Document</p>
                )}


            </div> */}
            <div>
                <label className="block mb-1 text-gray-700 font-medium">Date</label>
                <input
                    type="date"
                    readOnly
                    value={Session.date}
                    className="w-full border rounded-lg p-3 bg-gray-50"
                />
            </div>
            {/* <div>
                    <label className="block mb-1 text-gray-700 font-medium">FileName</label>

                    <input type="text"
                        readOnly
                        value={Session.filename}
                        className="w-full border rounded-lg p-3  bg-gray-50"
                    />
                </div> */}

            <div>
                <label className="block mb-1 text-gray-700 font-medium">Document</label>
                {Session.documentFileId ? (
                    <a
                        href={`${API}/SessionDocument/documents/${Session.documentFileId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 underline mt-2"
                    >
                        {Session.filename}
                    </a>
                ) : (
                    <p className="text-gray-500">No Document</p>
                )}


            </div>



            <div className="flex justify-center gap-6 mt-6">

                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-6 py-2 
               bg-red-600 text-white rounded-lg 
               hover:bg-red-700 active:scale-95 
               transition duration-200 shadow-md"
                >
                    🗑️ Delete
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-6 py-2 
               bg-gray-700 text-white rounded-lg 
               hover:bg-gray-800 active:scale-95 
               transition duration-200 shadow-md"
                >
                    ← Back
                </button>

            </div>



        </div>
    );
};

export default SessionDocumentView;
