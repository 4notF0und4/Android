import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "../pages/Courses";
import Sidebar from "../components/Sidebar";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/courses" element={<Courses />} />
           
            <Route path="*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
