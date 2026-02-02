import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AboutMemberView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pub, setPub] = useState<any>(null);

    const API = import.meta.env.VITE_API_URL

    useEffect(() => {
        // axios.get(`http://localhost:7000/publication/${id}`).then((res) => {
        axios.get(`${API}/aboutMember/${id}`)
            .then((res) => {
                setPub(res.data.data);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this publication?")) {
            return;
        }

        try {
            await axios.delete(`${API}/about/${id}`)
            // alert("publication Delete successfully")
            navigate(-1)

        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    }

    if (!pub)
        return (
            <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
        );

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 space-y-6">

            <h2 className="text-3xl font-bold text-center block mb-1 text-gray-700 ">About View </h2>


            <div>
                <label className="block mb-1 text-gray-700 font-medium">Title</label>
                {/* <textarea
                    readOnly
                    value={pub.title}
                    className="w-full border rounded-lg p-3 h-[165px] bg-gray-50"

                /> */}
                <input type="text"
                    readOnly
                    value={pub.title}
                    className="w-full border rounded-lg p-3  bg-gray-50"
                />
            </div>



            <div>
                <label className="block mb-1 text-gray-700 font-medium">Details</label>
                <textarea
                    readOnly
                    value={pub.details}
                    className="w-full border rounded-lg p-3 min-h-[165px] bg-gray-50"
                />
            </div>

                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Category</label>
                    <input
                        readOnly
                        value={pub.category}
                        className="w-full border rounded-lg p-3 bg-gray-50"
                    />
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* <div>
          <label className="font-semibold block mb-1">Date</label>
          <input
            type="date"
            readOnly
            value={pub.date}
            className="w-full border rounded-lg p-3 bg-gray-50"
          />
        </div> */}

            </div>


            {/* <div>
        <label className="font-semibold block mb-1">Image</label>
        {news.image ? (
          <img
            src={`data:image/*;base64,${news.image}`}
            className="w-48 mt-4 rounded shadow"
          />
        ) : (
          <p className="text-gray-500">No Image</p>
        )}
      </div> */}


            {/* <div>
        <label className="font-semibold block mb-1">Documents</label>

        {pub.documents.length > 0 ? (
          <div className="space-y-2 mt-2">
            {pub.documents.map((doc: any, index: number) => (
              <a
                key={index}
                href={`data:application/octet-stream;base64,${doc.data}`}
                // download={doc.name}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline"
              >
                {doc.name}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No documents</p>
        )}

      </div> */}

             <div>
                <label className="block mb-1 text-gray-700 font-medium">Document</label>
                {pub.documentFileId ? (
                    <a

                    
                    href={`${API}/aboutMember/${pub._id}/document`}

                      
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 underline mt-2"
                    >
                        
                        {pub.title}
                    </a>
                ) : (
                    <p className="text-gray-500">{pub.title}</p>
                )}
            </div>
 

            {/* <div className="text-center ">

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
        >
          Delete
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Back
        </button>
      </div> */}

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

export default AboutMemberView;
