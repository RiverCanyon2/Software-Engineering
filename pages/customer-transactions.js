import { useState, useEffect } from 'react';
import axios from 'axios';


const CustomerTransactions = () => {

    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        getCustomerTransactions();
    },[])
    

    const getCustomerTransactions = async () => {

        const response = await axios.get('/api/get-transactions')

        const data = await response.data.data;

        
        data.map((customer) => {
            console.log(customer)
            setCustomers((prevCustomers) => 
                [...prevCustomers, customer]
            )
        })
    }


    return(
        <>
            <h1 className='text-center'>CUSTOMERS</h1>
                {
                    customers.map((customer) => (
                        <div className='card'>
                            <div className='card-body d-flex w-80 justify-content-between'>
                                <div><h4 className='h4'>{customer.name}</h4></div>
                                <div><p>{customer.email}</p></div>
                                <div><p>{customer.address.line1} {customer.address.city}, {customer.address.state} {customer.address.postal_code}</p></div>
                            </div>
                        </div>
                    ))
                }
        </>
    )
}

export default CustomerTransactions;