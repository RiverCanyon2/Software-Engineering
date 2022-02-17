import { useState, useEffect, useContext} from 'react';
import { CheckoutContext } from './_app';
import 'bootstrap/dist/css/bootstrap.css'


const Checkout = () => {

    const { itemsInCart, setItemsInCart, total, setTotal } = useContext(CheckoutContext);


    return(
        <>
            <h1 className='h1 text-center my-4'>TIME TO FEAST</h1>
            <h2 className='h4 rounded bg-dark text-light my-3 text-center w-50 mx-auto'>CART ITEMS</h2>
            {itemsInCart.map((item) =>(
                <div className='container text-center w-50 h-25' >
                    <div className='container d-flex my-3 justify-content-between shadow-lg '>
                        <img src={item.image} className='w-25' alt='food-item'/>
                        <h3 className='h3'>{item.name}</h3>
                        <h4 className='h4'>{item.quantity}</h4>
                        <h4 className='h4'>${item.cost}.00</h4>
                    </div>
                </div>
            ))}
            {console.log(itemsInCart)}
            <div className='container w-50 bg-lighter shadow-lg rounded '>
                <div className='d-flex justify-content-between px-4'>
                    <h3>Sub-Total:</h3>
                    <h3>${total}.00</h3>
                </div>
            </div>
            <div className='text-center my-3 '>
                <button className='button btn-primary rounded-3 btn-lg btn-block shadow-lg' type='button'>CHECKOUT</button> 
            </div>
            
        </>
    )
}

export default Checkout;