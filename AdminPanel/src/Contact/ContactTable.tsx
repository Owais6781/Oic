

// import { Eye, Pencil } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface NewsItem {
//     _id: string;
//     name: string;
//     email: string;
//     subject: string;
//     message: string;
// }

// const ContactTable: React.FC = () => {
//     const [news, setNews] = useState<NewsItem[]>([]);
//     const [search, setSearch] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const navigate = useNavigate();
//     const API = import.meta.env.VITE_API_URL;

//     useEffect(() => {
//         axios
//             .get(`${API}/contact`)
//             .then((res) => setNews(res.data?.data || []))
//             .catch((err) => console.log(err));
//     }, [API]);

//     // Get unique categories for dropdown
//     const categories = Array.from(
//         new Set(news.map((item) => item.category).filter(Boolean))
//     );

//     // Filtered news based on search and category
//     const filteredNews = news.filter((item) => {
//         const matchTitle = item.name.toLowerCase().includes(search.toLowerCase());
//         const matchCategory = selectedCategory
//             ? item.category === selectedCategory
//             : true;
//         return matchTitle && matchCategory;
//     });

//     return (
//         <div className="w-full pl-55 py-6 bg-gray-100 min-h-screen flex justify-center">
//             <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-3xl font-semibold text-gray-800">Contact</h2>
//                     <button
//                         className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
//                         onClick={() => navigate("/about")}
//                     >
//                         Create
//                     </button>
//                 </div>

//                 {/* Search & Category Filter */}
//                 <div className="flex gap-4 mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search by title..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-1/2 px-4 py-2 border rounded-lg"
//                     />
//                     <select
//                         value={selectedCategory}
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         className="px-4 py-2 border rounded-lg"
//                     >
//                         <option value="">All Categories</option>
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse shadow-sm">
//                         <thead>
//                             <tr className="bg-gray-200 text-gray-700">
//                                 <th className="py-3 px-4 text-left">Name</th>
//                                 <th className="py-3 px-4 text-left">Email</th>
//                                 <th className="py-3 px-4 text-center">View</th>
//                                 <th className="py-3 px-4 text-center">Edit</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {filteredNews.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                                         No results found
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 filteredNews.map((item) => (
//                                     <tr key={item._id} className="border-b hover:bg-gray-50">
//                                         <td className="py-3 px-4">{item.name}</td>
//                                         <td className="py-3 px-4">{item.email}</td>

//                                         <td className="py-3 px-4 text-center">
//                                             <button
//                                                 className="text-blue-600"
//                                                 onClick={() => navigate(`/aboutview/${item._id}`)}
//                                             >
//                                                 <Eye className="w-5 h-5" />
//                                             </button>
//                                         </td>

//                                         <td className="py-3 px-4 text-center">
//                                             <button
//                                                 className="text-green-600"
//                                                 onClick={() =>
//                                                     navigate(`/publicationedit/${item._id}`)
//                                                 }
//                                             >
//                                                 <Pencil className="w-5 h-5" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>

//                     </table>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ContactTable;




import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/contact`)
      .then((res) => {
        setContacts(res.data.data || []);
      })
      .catch((err) => console.log(err));
  }, [API]);

  // 🔍 Search by name or email
  const filteredContacts = contacts.filter((item) => {
    const value = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value)
    );
  });

  return (
    <div className="w-full pl-55 py-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Contact</h2>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Edit</th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.email}</td>

                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-blue-600"
                        onClick={() => navigate(`/ContactView/${item._id}`)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-green-600"
                        onClick={() => navigate(`/contactedit/${item._id}`)}
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

export default ContactTable;
