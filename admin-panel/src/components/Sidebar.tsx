import React from "react";
import { Link } from "react-router-dom";


const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/courses" className="hover:text-yellow-300">
                Courses
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
    </div>
  );
};

export default Sidebar;
