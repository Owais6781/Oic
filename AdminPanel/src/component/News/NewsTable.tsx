



// import { Eye, Pencil} from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface NewsItem {
//   _id: string;
//   title: { [key: string]: string };
//   date?: string;
// }

// interface LangState {
//   [key: string]: string;
// }

// const languagesList = [
//   { code: "en", label: "EN" },
//   { code: "ar", label: "AR" },
//   { code: "fr", label: "FR" },
// ];

// const Table: React.FC = () => {
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [rowLang, setRowLang] = useState<LangState>({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/api/news")
//       .then((res) => setNews(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const getValue = (obj: any, lang: string): string => {
//     return obj?.[lang] && obj?.[lang].trim() !== "" ? obj[lang] : "—";
//   };

//   return (
//     <div className="w-full pl-55 py-6  bg-gray-100 min-h-screen flex justify-center ">
//       <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl   p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-semibold text-gray-800">News</h2>

//           <button
//             className="px-5 py-2 bg-blue-600  rounded-xl shadow hover:bg-blue-700 transition"
//             onClick={() => navigate("/newsform")}
//           >
//             Add
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse shadow-sm">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="hidden">ID</th>
//                 <th className="py-3 px-4 text-left">Title</th>
//                 <th className="py-3 px-4 text-left">Date</th>
//                 <th className="py-3 px-4 text-center">View</th>
//                 <th className="py-3 px-4 text-center">Edit</th>
//               </tr>
//             </thead>

//             <tbody>
//               {news.map((item) => {
//                 const lang = rowLang[item._id] || "en";

//                 return (
//                   <tr
//                     key={item._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="hidden">{item._id}</td>

//                     <td className="py-3 px-4 text-gray-800">
//                       {getValue(item.title, lang)}
//                     </td>

//                     <td className="py-3 px-4 text-gray-600">
//                       {item.date
//                         ? new Date(item.date).toLocaleDateString()
//                         : "—"}
//                     </td>

//                     <td className="py-3 px-4 text-center flex items-center gap-3 justify-center">
//                       <select
//                         className="border rounded-lg px-2 py-1 text-sm"
//                         value={lang}
//                         onChange={(e) =>
//                           setRowLang((prev) => ({
//                             ...prev,
//                             [item._id]: e.target.value,
//                           }))
//                         }
//                       >
//                         {languagesList.map((l) => (
//                           <option key={l.code} value={l.code}>
//                             {l.label}
//                           </option>
//                         ))}
//                       </select>

//                       {item.title?.[lang] && item.title[lang].trim() !== "" && (
//                         <button
//                           className="text-blue-600 hover:text-blue-800 text-xl"
//                           onClick={() => {
//                             localStorage.setItem("language", lang);
//                             navigate(`/view/${item._id}`);
//                           }}
//                         >
//                           <Eye className="w-5 h-5" />
//                         </button>
//                       )}
//                     </td>

//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="text-green-600 hover:text-green-800 text-xl"
//                         onClick={() => {
//                           const selectedLang = rowLang[item._id] || "en";
//                           localStorage.setItem("language", selectedLang);
//                           navigate(`/edit/${item._id}`);
//                         }}
//                       >
//                         <Pencil className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;



import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  _id: string;
  title: string;
  date?: string;
}

const Table: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/news`)
      .then((res) => {
        setNews(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredNews = news.filter((item) => {
    const searchValue = search.toLowerCase();

    const titleMatch = item.title
      ?.toLowerCase()
      .includes(searchValue);

    const dateMatch = item.date
      ? new Date(item.date)
          .toLocaleDateString()
          .includes(searchValue)
      : false;

    return titleMatch || dateMatch;
  });

  return (
    <div className="w-full pl-55 py-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">News</h2>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
            onClick={() => navigate("/newsform")}
          >
            Create
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Edit</th>
              </tr>
            </thead>

            <tbody>
              {filteredNews.length > 0 ? (
                filteredNews.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-blue-600"
                        onClick={() => navigate(`/view/${item._id}`)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-green-600"
                        onClick={() => navigate(`/edit/${item._id}`)}
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
