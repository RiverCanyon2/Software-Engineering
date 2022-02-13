import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect, useState } from 'react';


const Carnivores = () => {

    useEffect(() => {
        getCarnivoreRecords();
    },[])

    const [meats, setMeats] = useState([]);

    const getCarnivoreRecords = async() => {

        const response = await axios.get('/api/get-carnivore-items');
        const data = response.data;

        data.map((meats) => {
            setVegetables((prevMeats) => [...prevMeats, meats]);
        });
    }

    return(
        <div className='container'>
        <h1 className='h1 text-center my-4'>MEAT LOVERS</h1>
        <div className='container d-flex justify-content-around'>
            {meats.map((meat) => 
                <div className='card col-lg-3 shadow-lg' key={veggie.id}>
                    <div className='card-body'>
                        <h5 className='h5 card-text'>{meat.itemName}</h5>
                        <p className='card-text'>{meat.description}</p>
                        <p className='card-text'>{meat.costToMarket}</p>
                    </div>
                </div>
            )}
            
        </div>
        </div>
    )
}

export default Carnivores;