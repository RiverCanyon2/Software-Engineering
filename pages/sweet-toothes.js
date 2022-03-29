import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';


import { useEffect, useState, useContext  } from 'react';
import { CheckoutContext } from './_app';


const SweetTooths = () => {
    const { itemsInCart, setItemsInCart, total, setTotal } = useContext(CheckoutContext);
    const [ exists, setExists ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        getSweetToothRecords();
    },[])

    const [sweets, setSweets] = useState([]);


    const getSweetToothRecords = async() => {
        setLoading(true);

        const response = await axios.get('/api/get-sweet-tooth');
        const data = response.data;

        data.map((item) => {
            setSweets((prevItems) => [...prevItems, item]);
        });
        setLoading(false);
        
    }

    

    return(
        <div className='container' style={{marginTop:-50}}>
        <Script src='https://kit.fontawesome.com/9b62c297be.js' strategy='beforeInteractive' />
        <h1 className='h1 my-5 text-center'>SWEET TREATS</h1>
        {loading && 
            <div className='text-center mt-5'>
            <div class="spinner-border mx-auto" style={{width: '5rem', height: '5rem'}} role="status">
            </div>
            </div>}
        <div className='container d-flex'>
            {sweets.map((sweet) =>
                <div className='' style={{display: 'flex', flexDirection: 'row', marginRight:8, boxShadow: "5px 5px 5px black"}}>
                <div className='card shadow-lg px-0' key={Math.random * 10000} style={{flex: 1}}>
                    <img className='card-img-top image-fluid h-100 w-100' src={sweet.imageUrl} />
                    <div className='card-body' style={{height:"100%",}}>
                        <h5 className='card-text text-center'>{sweet.itemName}</h5>
                        <p className='card-text text-center'>${sweet.costToMarket}</p>
                        <div className='card-link d-flex justify-content-between'>
                            <button className='btn btn-dark btn-sm  pb-0 mb-0'
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
                                    
                                    if (exists === false) {
                                        setItemsInCart((prev) => [...prev, {
                                            name: sweet.itemName,
                                            quantity: 1,
                                            cost: parseInt(sweet.costToMarket),
                                            image: sweet.imageUrl,
                                            stripeApiID: sweet.stripeApiID
                                        }]); 
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
                                className='btn btn-dark btn-sm pb-0 mb-0' 
                                onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === sweet.itemName) {
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
                                                setItemsInCart((prev) => [...prev, {
                                                    name: sweet.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(sweet.costToMarket),
                                                    image: sweet.imageUrl,
                                                    stripeApiID: sweet.stripeApiID
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: sweet.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(sweet.costToMarket),
                                                    image: sweet.imageUrl,
                                                    stripeApiID: sweet.stripeApiID
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
                </div>
            )}
        </div>
        </div>
    )
}

export default SweetTooths;

//