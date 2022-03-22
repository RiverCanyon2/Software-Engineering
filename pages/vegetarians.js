import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'


import { useEffect, useState, useContext } from 'react';
import { CheckoutContext } from './_app';


const Vegetarians = () => {

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
        <div className='container'>
        <h1 className='h1 text-center my-4'>HEALTHY HABBITS</h1>
        {loading && 
            <div className='text-center mt-5'>
            <div class="spinner-border mx-auto" style={{width: '5rem', height: '5rem'}} role="status">
            </div>
            </div>}
        <div className='container d-flex'>
            {vegetables.map((vegetable) =>
                <div className='row w-100'>
                <div className='card col-4 shadow-lg px-0' key={Math.random * 10000} style={{width: "25%"}}>
                    <img className='card-img-top image-fluid h-50 w-100' src={vegetable.imageUrl} />
                    <div className='card-body h-50 pb-0' >
                        <h5 className='h5 card-text text-center'>{vegetable.itemName}</h5>
                        <p className='card-text text-center'>${vegetable.costToMarket}.00</p>
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
                                            stripeApiID: sweet.stripeApiID
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
                                                    stripeApiID: sweet.stripeApiID
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: vegetable.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(vegetable.costToMarket),
                                                    image: vegetable.imageUrl,
                                                    stripeApiID: sweet.stripeApiID
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