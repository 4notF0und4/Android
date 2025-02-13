import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md transition-colors duration-300"
    >
      {theme === "dark" ? <FiSun size={24} className="text-yellow-400" /> : <FiMoon size={24} className="text-gray-800" />}
    </button>
  );
};

export default ThemeToggle
