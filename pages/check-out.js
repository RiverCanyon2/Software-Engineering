import { useState, useEffect, useContext} from 'react';
import { CheckoutContext } from './_app';
import 'bootstrap/dist/css/bootstrap.css'


const Checkout = () => {

    const { itemsInCart, setItemsInCart } = useContext(CheckoutContext);


    return(
        <>
            <h1 className='h1 text-center my-4'>TIME TO FEAST</h1>
            <h4 className='h4 rounded bg-dark text-light my-3'>Cart Items</h4>
            {itemsInCart.map((item) =>(
                <div className='container text-center w-50' key={Math.random() * 10000}>
                    <div className='container d-flex my-3 justify-content-between shadow-lg '>
                        <img src={item.image} className='w-25' alt='food-item'/>
                        <h3 className='h3'>{item.name}</h3>
                        <h4 className='h4'>{item.cost}</h4>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Checkout;