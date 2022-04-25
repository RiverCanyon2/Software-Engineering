import { useContext, useEffect } from 'react';
import { CheckoutContext } from './_app';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'


const Checkout = () => {

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if(query.get('success')) {
            console.log('WHOOP')
        }
        if(query.get('cancel')){
            console.log("BLAH")
        }
    },[])

    const { itemsInCart, total } = useContext(CheckoutContext);

    const checkoutSubmitHandler = async (event) => {
        event.preventDefault();

        const line_items = itemsInCart.map((item) => {
                return ({
                    amount: item.cost * 100,
                    quantity: item.quantity,
                    currency: 'usd',
                    name: item.name
                })
            })
        await loadStripe(
            "pk_test_51KUacTD22xwXIH9AMgudKoGOvsZzj7T8ae4bePuoTVtt3s40QWCkE3wpAP1GOTkM1srYssEdvnsRM0m4Oo0Wz6Yl00GLVzDl6d"
        );
        const response = axios.post('/api/checkout_sessions', {
            line_items
        }, {
            headers: {
                "Content-Type": 'application/json',
        }
    })
        
        const body = await response;
        window.location.href = body.data.url;
    }


    return(
        <>
            <h1 className='h1 text-center my-4'>TIME TO FEAST</h1>
            <h2 className='h4 rounded bg-dark text-light my-3 text-center w-50 mx-auto'>CART ITEMS</h2>
            {itemsInCart.map((item) =>(
                <div className='container text-center w-50 h-25' >
                    <div className='container d-flex my-3 justify-content-between shadow-lg '>
                        <img src={item.image} style={{width: '100px', height: '100px'}} className='img-fluid mx-0 px-0' alt='food-item'/>
                        <h3 className='h3 pt-4'>{item.name}</h3>
                        <h4 className='h4 pt-4'>{item.quantity}</h4>
                        <h4 className='h4 pt-4'>${item.cost}.00</h4>
                    </div>
                </div>
            ))}
            {console.log(itemsInCart)}
            <div className='container w-50 bg-lighter shadow-lg rounded '>
                <div className='d-flex justify-content-between px-4'>
                    <h3>Total:</h3>
                    <h3>${total}.00</h3>
                </div>
            </div>
            <div className='text-center my-3 '>
            <form onSubmit={checkoutSubmitHandler}>
                <button 
                    className='button btn-primary rounded-3 btn-lg btn-block shadow-lg' 
                    type='submit'
                    >CHECKOUT</button>
            </form> 
            </div>
            
        </>
    )
}

export default Checkout;