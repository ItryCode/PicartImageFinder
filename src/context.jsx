import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";
  return storedDarkMode || prefersDarkMode;
};
export const AppProvider = ({ children }) => {
  const greeting = "hello";
  const [searchTerm, setSearchTerm] = useState("cat");
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());

  getInitialDarkMode();
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;

    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{
        searchTerm,
        greeting,
        isDarkTheme,
        toggleDarkTheme,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
