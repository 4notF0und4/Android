
import React from "react";
import AppRouter from "./Routes/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./context/ThemeToggle";



import './App.css';


const App: React.FC = () => {
  return (
    <div>

<ThemeProvider>
     
       
     <AppRouter />
    <ThemeToggle/>
 </ThemeProvider>

    </div>
   
  );
};

export default App;
