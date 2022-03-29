import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';


import { useEffect, useState, useContext  } from 'react';
import { CheckoutContext } from './_app';


const Carnivores = () => {
    const { itemsInCart, setItemsInCart, total, setTotal } = useContext(CheckoutContext);
    const [ exists, setExists ] = useState(false);

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
        <div className='container' style={{marginTop:-25}}>
        <h1 className='h1 text-center my-4'>MEAT LOVERS</h1>
        {loading && 
            <div className='text-center mt-5'>
            <div class="spinner-border mx-auto" style={{width: '5rem', height: '5rem'}} role="status">
            </div>
            </div>}
        <div className='container d-flex'>
            {meats.map((meat) =>
                <div className='' style={{display: 'flex', flexDirection: 'row', marginRight:8, boxShadow: "5px 5px 5px black"}}>
                <div className='card shadow-lg px-0' key={Math.random * 10000} style={{flex: 1}}>
                    <img className='card-img-top image-fluid h-100 w-100' src={meat.imageUrl} />
                    <div className='card-body' style={{height:"100%",}}>
                        <h5 className='h5 card-text text-center'>{meat.itemName}</h5>
                        <p className='card-text text-center'>${meat.costToMarket}</p>
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
                                            stripeApiID: meat.stripeApiID
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
                                                    stripeApiID: meat.stripeApiID
                                                }]);
                                            }
                                        })
                                    }else {
                                        setItemsInCart((prev) => [...prev, {
                                                    name: meat.itemName,
                                                    quantity: 1,
                                                    cost: parseInt(meat.costToMarket),
                                                    image: meat.imageUrl,
                                                    stripeApiID: meat.stripeApiID
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