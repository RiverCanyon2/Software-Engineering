import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';

import { useEffect, useState, useContext  } from 'react';
import { CheckoutContext } from './_app';


const SweetTooths = () => {
    const { itemsInCart, setItemsInCart, total, setTotal } = useContext(CheckoutContext);
    const [ exists, setExists ] = useState(false);

    useEffect(() => {
        getSweetToothRecords();
    },[])

    const [sweets, setSweets] = useState([]);


    const getSweetToothRecords = async() => {

        const response = await axios.get('/api/get-sweet-tooth');
        const data = response.data;

        data.map((item) => {
            setSweets((prevItems) => [...prevItems, item]);
        });
    }

    

    return(
        <div className='container'>
        <Script src='https://kit.fontawesome.com/9b62c297be.js' strategy='beforeInteractive' />
        <h1 className='h1 my-4 text-center'>SWEET TREATS</h1>
        <div className='container d-flex justify-content-around'>
            {sweets.map((sweet) => 
                <div className='card col-3 shadow-lg h-auto' key={Math.random * 10000}>
                    <img className='card-img-top image-fluid h-50 w-100' src={sweet.imageUrl} />
                    <div className='card-body h-50'>
                        <h5 className='h5 card-text text-center'>{sweet.itemName}</h5>
                        <p className='card-text text-center'>${sweet.costToMarket}.00</p>
                        <div className='container d-flex justify-content-between'>
                            <button className='btn btn-dark btn-sm'
                            onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === sweet.itemName) {
                                                setExists(true);
                                            }
                                            else {
                                                setExists(false)
                                            }
                                        })
                                    }
                                    console.log(exists)
                                    
                                    if (exists === false) {
                                        setItemsInCart((prev) => [...prev, {
                                            name: sweet.itemName,
                                            quantity: 1,
                                            cost: parseInt(sweet.costToMarket),
                                            image: sweet.imageUrl
                                        }]); 
                                        console.log(itemsInCart)
                                        }
                                        else {
                                            const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === sweet.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity - 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                        }
                                        setTotal(total = total - parseInt(sweet.costToMarket));
                                    }
                                    }
                            >-</button>

                            <button 
                                className='btn btn-dark btn-sm' 
                                onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === sweet.itemName) {
                                                console.log("CORRECT")
                                                const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === sweet.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity + 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                            }
                                            else {
                                                console.log("ERROR")
                                                setItemsInCart((prev) => [...prev, {
                                                    name: sweet.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(sweet.costToMarket),
                                                    image: sweet.imageUrl
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: sweet.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(sweet.costToMarket),
                                                    image: sweet.imageUrl
                                                }]); 
                                                
                                    }
                                        setTotal(total = total + parseInt(sweet.costToMarket));
                                    }
                                    }
                                >
                                +
                            </button>
                        </div> 
                    </div>
                </div>
            )}
        </div>
        <p>{JSON.stringify(exists)}</p>
        <p>{JSON.stringify(itemsInCart)}</p>
        </div>
    )
}

export default SweetTooths;