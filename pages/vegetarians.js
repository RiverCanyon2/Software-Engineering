import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';


import { useEffect, useState, useContext  } from 'react';
import { CheckoutContext } from './_app';


const Vegetarians = () => {
    const { itemsInCart, setItemsInCart, total, setTotal } = useContext(CheckoutContext);
    const [ exists, setExists ] = useState(false);

    useEffect(() => {
        getVegetarianRecords();
    },[])

    const [vegetables, setVegetables] = useState([]);
    const [loading, setLoading] = useState(false)

    const getVegetarianRecords = async() => {
        setLoading(true);

        const response = await axios.get('/api/get-vegetarian-items');
        const data = response.data;
        console.log(data)

        data.map((vegetable) => {
            setVegetables((prevVeggies) => [...prevVeggies, vegetable]);
        });
        setLoading(false);
    }

    return(
        <div className='container' style={{marginTop:-25}}>
        <h1 className='h1 text-center my-4'>HEALTHY HABBITS</h1>
        {loading && 
            <div className='text-center mt-5'>
            <div class="spinner-border mx-auto" style={{width: '5rem', height: '5rem'}} role="status">
            </div>
            </div>}
        <div className='container d-flex'>
            {vegetables.map((vegetable) =>
                <div className='' style={{display: 'flex', flexDirection: 'row', marginRight:8, boxShadow: "5px 5px 5px black"}}>
                <div className='card shadow-lg px-0' key={Math.random * 10000} style={{flex: 1}}>
                    <img className='card-img-top image-fluid h-100 w-100' src={vegetable.imageUrl} />
                    <div className='card-body' style={{height:"100%"}}>
                        <h5 className='h5 card-text text-center'>{vegetable.itemName}</h5>
                        <p className='card-text text-center'>${vegetable.costToMarket}</p>
                        <div className='card-link d-flex justify-content-between'>
                            <button className='btn btn-dark btn-sm  pb-0 mb-0'
                            onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === vegetable.itemName) {
                                                setExists(true);
                                            }
                                            else {
                                                setExists(false)
                                            }
                                        })
                                    }
                                    
                                    if (exists === false) {
                                        setItemsInCart((prev) => [...prev, {
                                            name: vegetable.itemName,
                                            quantity: 1,
                                            cost: parseInt(vegetable.costToMarket),
                                            image: vegetable.imageUrl,
                                            stripeApiID: vegetable.stripeApiID
                                        }]); 
                                        }
                                        else {
                                            const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === vegetable.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity - 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                        }
                                        setTotal(total = total - parseInt(vegetable.costToMarket));
                                    }
                                    }
                            >-</button>

                            <button 
                                className='btn btn-dark btn-sm pb-0 mb-0' 
                                onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === vegetable.itemName) {
                                                const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === vegetable.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity + 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                            }
                                            else {
                                                setItemsInCart((prev) => [...prev, {
                                                    name: vegetable.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(vegetable.costToMarket),
                                                    image: vegetable.imageUrl,
                                                    stripeApiID: vegetable.stripeApiID
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: vegetable.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(vegetable.costToMarket),
                                                    image: vegetable.imageUrl,
                                                    stripeApiID: vegetable.stripeApiID
                                                }]); 
                                                
                                    }
                                        setTotal(total = total + parseInt(vegetable.costToMarket));
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

export default Vegetarians;
//