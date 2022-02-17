import './styles/main.css'
import Navbar from './../UI/Navbar/Navbar'
import { createContext, useState, useMemo } from 'react';

export const CheckoutContext = createContext({
  itemsInCart: [],
  setItemsInCart: () => {},
  total: 0,
  setTotal: () => {}
});


function MyApp({ Component, pageProps }) {

  const [itemsInCart, setItemsInCart] = useState([])
  const [total, setTotal] = useState(0);
  const value = useMemo(
    () => ({ itemsInCart, setItemsInCart, total, setTotal}),
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
