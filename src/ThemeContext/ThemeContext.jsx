import {  createContext,  useState } from "react";


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
     const [theme, setTheme] = useState("light")


 const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

     return(
         <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? "bg-white text-black min-h-screen" : "bg-gray-900 text-black min-h-screen"}>
        {children}
      </div>
        </ThemeContext.Provider>
     )
}