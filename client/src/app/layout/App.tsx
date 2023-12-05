import Catalog from "../../features/Catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/Catalog/ProductDetails";

interface darkTheme {
  setDarkMode: () => void;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType
    }
  })


  function handleThemeChangeApp() {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChangeApp={handleThemeChangeApp} />
      <Container>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/catalog' Component={Catalog} />
          <Route path='/catalog/:id' Component={ProductDetails} />
          <Route path='/about' Component={AboutPage} />
          <Route path='/contact' Component={ContactPage} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
