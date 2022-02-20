import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect, useState } from 'react';


const Carnivores = () => {

    useEffect(() => {
        getCarnivoreRecords();
    },[])

    const [meats, setMeats] = useState([]);
    const [loading, setLoading] = useState(false);
    

    const getCarnivoreRecords = async() => {
        setLoading(true);
        const response = await axios.get('/api/get-carnivore-items');
        const data = response.data;

        data.map((meats) => {
            setMeats((prevMeats) => [...prevMeats, meats]);
        });
        setLoading(false);
    }

    return(
        <div className='container'>
        <h1 className='h1 text-center my-4'>MEAT LOVERS</h1>
        {loading && 
            <div className='text-center mt-5'>
            <div class="spinner-border mx-auto" style={{width: '5rem', height: '5rem'}} role="status">
            </div>
            </div>}
        <div className='container d-flex'>
            {meats.map((meat) =>
                <div className='row w-100'>
                <div className='card col-4 shadow-lg px-0' key={Math.random * 10000}>
                    <img className='card-img-top image-fluid h-50 w-100' src={meat.imageUrl} />
                    <div className='card-body h-50 pb-0' >
                        <h5 className='h5 card-text text-center'>{meat.itemName}</h5>
                        <p className='card-text text-center'>${meat.costToMarket}.00</p>
                        <div className='card-link d-flex justify-content-between'>
                            <button className='btn btn-dark btn-sm  pb-0 mb-0'
                            onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === meat.itemName) {
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
                                            name: meat.itemName,
                                            quantity: 1,
                                            cost: parseInt(meat.costToMarket),
                                            image: meat.imageUrl,
                                            stripeApiID: sweet.stripeApiID
                                        }]); 
                                        console.log(itemsInCart)
                                        }
                                        else {
                                            const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === meat.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity - 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                        }
                                        setTotal(total = total - parseInt(meat.costToMarket));
                                    }
                                    }
                            >-</button>

                            <button 
                                className='btn btn-dark btn-sm pb-0 mb-0' 
                                onClick={() => {
                                    if(itemsInCart.length !== 0) {
                                        itemsInCart.map((cartItem) => {
                                            if(cartItem.name === meat.itemName) {
                                                const newArray = itemsInCart.map((cartItem) => {
                                                    if(cartItem.name === meat.itemName) {
                                                        return {...cartItem, quantity: cartItem.quantity = cartItem.quantity + 1}
                                                    }else {
                                                        return cartItem
                                                    }
                                                })
                                            setItemsInCart(newArray)
                                            }
                                            else {
                                                setItemsInCart((prev) => [...prev, {
                                                    name: meat.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(meat.costToMarket),
                                                    image: meat.imageUrl,
                                                    stripeApiID: sweet.stripeApiID
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: meat.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(meat.costToMarket),
                                                    image: meat.imageUrl,
                                                    stripeApiID: sweet.stripeApiID
                                                }]); 
                                                
                                    }
                                        setTotal(total = total + parseInt(meat.costToMarket));
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

export default Carnivores;