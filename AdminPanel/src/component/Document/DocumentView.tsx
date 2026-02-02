import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DocumentView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [legal, setlegal] = useState<any>(null);

  const API = import.meta.env.VITE_API_URL

  useEffect(() => {
    debugger

    axios.get(`${API}/documentSection/${id}`)
      .then((res) => {
        setlegal(res.data.data);
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

  if (!legal)
    return (
      <h2 className="text-center text-xl font-semibold mt-10">Loading...</h2>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 space-y-6">

      <h2 className="text-3xl font-bold text-center block mb-1 text-gray-700 ">Legal Instrumens View </h2>


      <div>
        <label className="block mb-1 text-gray-700 font-medium">Title</label>
      
        <input type="text"
          readOnly
          value={legal.title}
          className="w-full border rounded-lg p-3  bg-gray-50"
        />
      </div>


      {/* <div>
        <label className="font-semibold block mb-1">Details</label>
        <textarea
          readOnly
          value={news.details}
          className="w-full border rounded-lg p-3 min-h-[120px] bg-gray-50"
        />
      </div> */}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Category</label>
          <input
            readOnly
            value={legal.category}
            className="w-full border rounded-lg p-3 bg-gray-50"
          />
        </div>

        <div>
          {/* <label className="font-semibold block mb-1">Date</label>
          <input
            type="date"
            readOnly
            value={pub.date}
            className="w-full border rounded-lg p-3 bg-gray-50"
          /> */}
        </div>

      </div>



      <div>
       <label className="block mb-1 text-gray-700 font-medium">Document</label>
        {legal.documentFileId ? (
          <a
            href={`${API}/documentSection/document/${legal._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline mt-2"
          >
            {"View / Download"}
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

export default DocumentView;
