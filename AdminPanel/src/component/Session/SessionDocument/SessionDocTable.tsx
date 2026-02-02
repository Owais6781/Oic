
import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
}

const SessionDocTable: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");


  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/SessionDocument`)
      .then((res) => {
        setNews(res.data?.data || []);
      })
      .catch((err) => console.log(err));
  }, [API]);





  const filteredNews = news.filter((item) => {
    const matchTitle = item.title.toLowerCase().includes(search.toLowerCase());


    return matchTitle
  });

  return (
    <div className="w-full pl-55 py-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Session Document
          </h2>

          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/SessionDocumentForm")}
          >
            Create
          </button>
        </div>


        <div className="flex gap-4 mb-5">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/2"
          />


        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="hidden">ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Edit</th>
              </tr>
            </thead>

            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="hidden">{item._id}</td>

                    <td className="py-3 px-4 text-gray-800">
                      {item.title || "—"}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {item.date || "—"}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/SessionDocumentView/${item._id}`)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() =>
                          navigate(`/publicationedit/${item._id}`)
                        }
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionDocTable;
