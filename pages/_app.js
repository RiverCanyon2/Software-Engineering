import './styles/main.css'
import Navbar from './../UI/Navbar/Navbar'
import { createContext, useState, useMemo } from 'react';

export const CheckoutContext = createContext({
  itemsInCart: [],
  setItemsInCart: () => {},
});


function MyApp({ Component, pageProps }) {

  const [itemsInCart, setItemsInCart] = useState([])
  const value = useMemo(
    () => ({ itemsInCart, setItemsInCart}),
    [itemsInCart]
  );

  return (
  <CheckoutContext.Provider value={value}>
    <Navbar />
    <Component {...pageProps} />
  </CheckoutContext.Provider>
   )
}

export default MyApp
