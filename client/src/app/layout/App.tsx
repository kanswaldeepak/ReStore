import Catalog from "../../features/Catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/Catalog/ProductDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

interface darkTheme {
  setDarkMode: () => void;
}

function App() {

  const navigate=useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType
    }
  })

  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window['navigate']=navigate;
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[setBasket])

  if(loading) return <LoadingComponent message="Initialising App...." />

  function handleThemeChangeApp() {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChangeApp={handleThemeChangeApp} />
      <Container>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/catalog' Component={Catalog} />
          <Route path='/catalog/:id' Component={ProductDetails} />
          <Route path='/about' Component={AboutPage} />
          <Route path='/contact' Component={ContactPage} />
          <Route path='/server-error' Component={ServerError} />
          <Route path='/basket' Component={BasketPage} />
          <Route path='/checkout' Component={CheckoutPage} />
          <Route Component={ContactPage} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
