

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Newspaper,
//   Info,
//    Scale,
//    Activity,
//    Layers,
//   FileText,
//    BookOpen,
// } from "lucide-react";

// const menuItems = [
//   { name: "News", icon: <Newspaper size={18} />, path: "/" },
//    { name: "Publication", icon: <BookOpen size={18} />, path: "/publicationTable" },
//      { name: "About", icon: <Info size={18} />, path: "/aboutTable" },
//    { name: "Legal Instruments", icon: <Scale size={18} />, path: "/legalTable" },
//    { name: "Activities", icon: <Activity size={18} />, path: "/activitiesTable" },
//    { name: "Session", icon: <Layers size={18} />, path: "/sessionTable" },
//    { name: "Document", icon: <FileText size={18} />, path: "/documentTable" },

// ];

// const Panel: React.FC = () => {
//   const location = useLocation();

//   return (

// <div className="w-64 h-screen  bg-gradient-to-b fixed left-0 top-0 bg-gray-200 text-gray-800">

//       <h2 className="text-2xl font-bold px-6 py-6 border-b border-gray-700">
//         Admin Panel
//       </h2>


//       <ul className="flex flex-col gap-1 mt-4 overflow-y-auto">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <li key={item.path}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center gap-3 px-5 py-3 transition-all text-sm font-medium
//                   ${isActive
//                     ? "bg-blue-600 text-white rounded-lg"
//                     : "text-gray-300 hover:bg-gray-800 hover:bg-gradient-to-r rounded-lg"
//                   }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>

//     </div>
//   );
// };

// export default Panel;



// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Newspaper,
//   Info,
//   Scale,
//   Activity,
//      Layers,
//    FileText,
//   BookOpen,
// } from "lucide-react";

// const menuItems = [
//   { name: "News", icon: <Newspaper size={18} />, path: "/" },
//   { name: "Publication", icon: <BookOpen size={18} />, path: "/publicationTable" },
//   { name: "About", icon: <Info size={18} />, path: "/aboutTable" },
//   { name: "Legal Instruments", icon: <Scale size={18} />, path: "/legalTable" },
//   // { name: "Activities", icon: <Activity size={18} />, path: "/activitiesTable" },
//   {
//     name: "Activities",
//     icon: <Activity size={18} />,
//     children: [
//       {
//         name: "All Activities",
//         path: "/activitiesTable",
//       },
//       {
//         name: "Seminars",
//         path: "/activitiesTable/Seminars",
//       },
//       {
//         name: "Field Visits",
//         path: "/activitiesTable/Field%20Visits",
//       },
//       {
//         name: "Conferences & Meetings",
//         path: "/activitiesTable/Conferences%20%26%20Meetings",
//       },
//     ],
//   },
//   { name: "Session", icon: <Layers size={18} />, path: "/sessionTable" },
//     { name: "Document", icon: <FileText size={18} />, path: "/documentTable" }
// ];

// const Panel: React.FC = () => {
//   const location = useLocation();

//   return (
//     <div className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-gray-900 to-gray-700 text-gray-100 shadow-lg">
//       {/* Header */}
//       <h2 className="text-2xl font-bold px-6 py-6 border-b border-gray-600">
//         Admin Panel
//       </h2>

//       {/* Menu */}
//       <ul className="flex flex-col gap-1 mt-4  scrollbar-hide">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <li key={item.path}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 text-sm font-medium
//                   ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-md border-l-4 border-blue-400"
//                       : "text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:scale-105 hover:shadow-lg"
//                   }`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Panel;



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Newspaper,
  Info,
  Scale,
  Activity,
  Layers,
  FileText,
  BookOpen,
  ChevronDown,
  
  
} from "lucide-react";



const menuItems = [
  { name: "News", icon: <Newspaper size={18} />, path: "/" },
  { name: "Publication", icon: <BookOpen size={18} />, path: "/publicationTable" },

  {
    name: "About", icon: <Info size={18} />,
    children: [
      { name: "About", path: "/aboutTable" },
      { name: "Commission Members ,IPHRC-Former Commission Members", path: "/aboutMemberTable" },
    ],
  },
  { name: "Legal Instruments", icon: <Scale size={18} />, path: "/legalTable" },

  {
    name: "Activities",
    icon: <Activity size={18} />,
    children: [
      { name: " Activities", path: "/activitiesTable" },
      { name: "Conferences & Meetings", path: "/activiesConference", },
    ],
  },

  {
    name: "Session",
    icon: <Layers size={18} />,
    children: [
      { name: " About Session", path: "/AboustSession" },
      { name: "Session Document", path: "/SessionDocTable", },
    ],
  },

  { name: "Document", icon: <FileText size={18} />, path: "/documentTable" },
  
    { name: "Contact", icon: <FileText size={18} />, path: "/contactTable" },

];

const Panel: React.FC = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>("Activities");

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-gray-900 to-gray-700 text-gray-100 shadow-lg">

      <h2 className="text-2xl font-bold px-6 py-6 border-b border-gray-600">
        Admin Panel
      </h2>

      <ul className="flex flex-col gap-1 mt-4 px-2">
        {menuItems.map((item) => {

          if (item.children) {
            const isOpen = openMenu === item.name;

            return (
              <li key={item.name}>
                <button
                  onClick={() =>
                    setOpenMenu(isOpen ? null : item.name)
                  }
                  className="flex w-full items-center justify-between px-5 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.name}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isOpen && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isActive =
                        location.pathname === child.path;

                      return (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={`block px-3 py-2 rounded-md text-sm
                              ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-blue-500 hover:text-white"
                              }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          }


          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "bg-blue-600 text-white shadow-md border-l-4 border-blue-400"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Panel;
