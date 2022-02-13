import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script';

import { useEffect, useState, useContext  } from 'react';
import { CheckoutContext } from './_app';


const SweetTooths = () => {
    const { itemsInCart, setItemsInCart } = useContext(CheckoutContext);

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

    const onAddItemHandler = () => {
        
    }
    const onRemoveItemHandler = () => {

    }

    

    return(
        <div className='container'>
        <Script src='https://kit.fontawesome.com/9b62c297be.js' strategy='beforeInteractive' />
        <h1 className='h1 my-4 text-center'>SWEET TREATS</h1>
        <div className='container d-flex justify-content-around'>
            {sweets.map((sweet) => 
                <div className='card col-lg-3 shadow-lg' key={Math.random * 10000}>
                    <img className='card-img-top' src={sweet.imageUrl} />
                    <div className='card-body'>
                        <h5 className='h5 card-text text-center'>{sweet.itemName}</h5>
                        <p className='card-text text-center'>${sweet.costToMarket}.00</p>
                        <div className='container d-flex justify-content-between'>
                            <button className='btn btn-dark btn-sm' onClick={onRemoveItemHandler}>-</button>
                            <button 
                                className='btn btn-dark btn-sm' 
                                onClick={() => {
                                        setItemsInCart((prev) => [...prev, {
                                            name: sweet.itemName,
                                            quantity: 1,
                                            cost: sweet.costToMarket,
                                            image: sweet.imageUrl
                                        }]); 
                                        console.log(itemsInCart)
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
        </div>
    )
}

export default SweetTooths;