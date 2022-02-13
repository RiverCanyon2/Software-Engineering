import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect, useState } from 'react';


const Vegetarians = () => {

    useEffect(() => {
        getVegetarianRecords();
    },[])

    const [vegetables, setVegetables] = useState([]);

    const getVegetarianRecords = async() => {

        const response = await axios.get('/api/get-vegetarian-items');
        const data = response.data;

        data.map((vegetable) => {
            setVegetables((prevVeggies) => [...prevVeggies, vegetable]);
            console.log(vegetable.category);
        });
    }

    return(
        <div className='container'>
        <h1 className='h1 text-center my-4'>HEALTHY HABBITS</h1>
        <div className='container d-flex justify-content-around'>
            {vegetables.map((veggie) => 
                <div className='card col-lg-3 shadow-lg' key={veggie.id}>
                    <div className='card-body'>
                        <h5 className='h5 card-text'>{veggie.itemName}</h5>
                        <p className='card-text'>{veggie.description}</p>
                        <p className='card-text'>{veggie.costToMarket}</p>
                    </div>
                </div>
            )}
            
        </div>
        </div>
    )
}

export default Vegetarians;

// itemName: '',
// category: 'Vegetables', 
// description: '',
// nutrients: {
//     calories: '',
//     totalFat: '',
//     saturatedFat: '',
//     transFat: '',
//     cholesterol: '',
//     sodium: '',
//     potassium: '',
//     totalCarbohydrate: '',
//     fiber: '',
//     sugar: '',
//     protein: '',
// }