import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState<any>(null);

    const API = import.meta.env.VITE_API_URL

    useEffect(() => {
        debugger

        axios.get(`${API}/contact/${id}`)
            .then((res) => {
                setInfo(res.data.data);
            });
    }, [id]);



    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this publication?")) {
            return;
        }

        try {
            await axios.delete(`${API}/publication/${id}`)
            // alert("publication Delete successfully")
            navigate(-1)

        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    }

    if (!info)
        return (
            <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
        );

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 space-y-6">

            <h2 className="text-3xl font-bold text-center block mb-1 text-gray-700 ">Contact View </h2>


            <div>
                <label className="block mb-1 text-gray-700 font-medium">Name</label>

                <input type="text"
                    readOnly
                    value={info.name}
                    className="w-full border rounded-lg p-3  bg-gray-50"
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700 font-medium">Email</label>
                <input
                    readOnly
                    value={info.email}
                    className="w-full border rounded-lg p-3 bg-gray-50"
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-700 font-medium">Subject</label>
                <input
                    readOnly
                    value={info.subject}
                    className="w-full border rounded-lg p-3 bg-gray-50"
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Message</label>
                <textarea
                    readOnly
                    value={info.message}
                    className="w-full border rounded-lg p-3 min-h-[120px] bg-gray-50"
                />
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

export default ContactView;
