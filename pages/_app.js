import './styles/main.css'
import Navbar from './../UI/Navbar/Navbar'
import Footer from './../UI/Navbar/Footer'
import { createContext, useState, useMemo } from 'react';

export const CheckoutContext = createContext({
  itemsInCart: [],
  setItemsInCart: () => {},
  total: 0,
  setTotal: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  isAdmin: false,
  setIsAdmin: () => {}
});


function MyApp({ Component, pageProps }) {

  const [itemsInCart, setItemsInCart] = useState([])
  const [total, setTotal] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin ] = useState(false);
  const value = useMemo(
    () => ({ itemsInCart, setItemsInCart, total, setTotal, loggedIn, setLoggedIn, isAdmin, setIsAdmin}),
    [itemsInCart, loggedIn, isAdmin]
  );

  return (
  <CheckoutContext.Provider value={value}>
    <Navbar />
    <div className="backgroundColor">
    <Component {...pageProps} />
    </div>
    <Footer />
  </CheckoutContext.Provider>
   )
}

export default MyApp
