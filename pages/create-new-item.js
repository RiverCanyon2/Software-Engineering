import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link';

import { useState } from 'react';
import axios from 'axios';

const CreateNewItem = () => {

  const [itemName, setItemName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('vegetarian');
  const [description, setDescription] = useState('');
  const [nutrients, setNutrients] = useState({
    calories: '',
    totalFat: '',
    saturatedFat: '',
    transFat: '',
    cholesterol: '',
    sodium: '',
    potassium: '',
    totalCarbohydrate: '',
    fiber: '',
    sugar: '',
    protein: ''
  })
  const [costOfGoods, setCostOfGoods] = useState(0);
  const [costToMarket, setCostToMarket] = useState(0);
  const [stripeApiID, setStripeApiID] = useState('');

  const [createNewItem, setCreateNewItem] = useState(false)

  const submitFormHandler = async event => {
    event.preventDefault();

    const response = await axios.post('/api/create-item',{
      id: Math.random() * 10000,
      itemName,
      category,
      imageUrl,
      description,
      nutrients: {
        calories: nutrients.calories,
        totalFat: nutrients.totalFat,
        saturatedFat: nutrients.saturatedFat,
        transFat: nutrients.transFat,
        cholesterol: nutrients.cholesterol,
        sodium: nutrients.sodium,
        potassium: nutrients.potassium,
        totalCarbohydrate: nutrients.totalCarbohydrate,
        fiber: nutrients.fiber,
        sugar: nutrients.sugar,
        protein: nutrients.protein
      },
      costOfGoods,
      costToMarket,
      stripeApiID
    });

    
    
    setItemName('');
    setCategory('vegetarian');
    setImageUrl('');
    setDescription('');
    setNutrients({
      calories: '',
      totalFat: '',
      saturatedFat: '',
      transFat: '',
      cholesterol: '',
      sodium: '',
      potassium: '',
      totalCarbohydrate: '',
      fiber: '',
      sugar: '',
      protein: ''
    });
    setCostOfGoods(0);
    setCostToMarket(0);
    setStripeApiID('');
  }

  const itemNameHandler = event => {
    setItemName(event.target.value);
  }
  const imageUrlHandler = event => {
    setImageUrl(event.target.value);
  }
  const categoryHandler = event => {
    setCategory(event.target.value);
  }
  const descriptionHandler = event => {
    setDescription(event.target.value);
  }
  const costOfGoodHandler = event => {
    setCostOfGoods(event.target.value);
  }
  const costToMarketHandler = event => {
    setCostToMarket(event.target.value);
  }
  const stripeIdHandler = event => {
    setStripeApiID(event.target.value);
  }

  const createItemHandler = () => {
    setCreateNewItem(true);
  }
  

    return (
      <div className='create-item-page'>
      <div className='text-center pt-4'>
        <button className='btn btn-primary mx-2' onClick={createItemHandler}>CREATE NEW ITEM</button>
        <Link href='/customer-transactions' >
        <button className='btn btn-secondary mx-2 text-white' style={{color: 'white', textDecoration: 'none'}} >
          VIEW TRANSACTION DATA
        </button>
        </Link>
      </div>
      {createNewItem && <div className='pt-3'>
      <form className='bg-dark text-white w-50 mx-auto rounded shadow-lg' onSubmit={submitFormHandler}>
      <h2 className='h2 pb-4 text-center'>ADD NEW ITEM</h2>
      <div className='mx-auto my-2 w-75'>
        <label>Item Name</label>
        <input 
          className='shadow form-control' 
          onChange={itemNameHandler}
          value={itemName}
          />
      </div>
      <div className='mx-auto my-2 w-75'>
        <label>Stripe API ID</label>
        <input 
          className='shadow form-control' 
          onChange={stripeIdHandler}
          value={stripeApiID}
          required
          placeholder='*Required'
          />
      </div>
      <div className='mx-auto my-2 w-75'>
        <label>Image URL</label>
        <input 
          className='shadow form-control' 
          onChange={imageUrlHandler}
          value={imageUrl}
          />
      </div>
      <div className='mx-auto my-2 w-75'>
        <label>Category</label>
        <select 
          className="form-select" 
          aria-label="Default select example" 
          onChange={categoryHandler}
          value={category}
          >
          <option value='DEFAULT' disabled>Select a Category </option>
          <option value="Vegetarian" >Vegetarian</option>
          <option value="Carnivore">Carnivore</option>
          <option value="Sweet_Tooth">Sweet Tooth</option>
        </select>
      </div>
      <h4 className='h4 text-center'>Nutrients</h4>
      <div className='mx-auto my-4 w-75'>
        <div className='row'>
        <div className='col-lg-4'>
            <label>Calories</label>
            <input  
              className='shadow form-control w-50' 
              onChange={event => setNutrients({...nutrients, calories: event.target.value})}
              value={nutrients.calories}
              />
          </div>
          <div className='col-lg-4'>
              <label>Total Fat</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, totalFat: event.target.value})}
                value={nutrients.totalFat}
                />
            </div>
            <div className='col-lg-4'>
            <label>Saturated Fat</label>
            <input  
              className='shadow form-control w-50' 
              onChange={event => setNutrients({...nutrients, saturatedFat: event.target.value})}
              value={nutrients.saturatedFat}
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4'>
              <label>Trans Fat</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, transFat: event.target.value})}
                value={nutrients.transFat}
                />
            </div>
            <div className='col-lg-4'>
              <label>Cholesterol</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, cholesterol: event.target.value})}
                value={nutrients.cholesterol}
                />
            </div>
            <div className='col-lg-4'>
              <label>Sodium</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, sodium: event.target.value})}
                value={nutrients.sodium}
                />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4'>
              <label>Potassium</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, potassium: event.target.value})}
                value={nutrients.potassium}
                />
            </div>
            <div className='col-lg-4'>
              <label>Total Carb</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, totalCarbohydrate: event.target.value})}
                value={nutrients.totalCarbohydrate}
                />
            </div>
            <div className='col-lg-4'>
            <label>Fiber</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, fiber: event.target.value})}
                value={nutrients.fiber}
                />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4'>
              <label>Sugar</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, sugar: event.target.value})}
                value={nutrients.sugar}
                />
            </div>
            <div className='col-lg-4'>
              <label>Protein</label>
              <input  
                className='shadow form-control w-50' 
                onChange={event => setNutrients({...nutrients, protein: event.target.value})}
                value={nutrients.protein}
                />
            </div>
          </div>
        </div>
      <div className='w-75 mx-auto'>
      <label>Description</label>
        <input
              className='shadow form-control' 
              onChange={descriptionHandler}
              value={description}
              />
      </div>
        <div className='mx-auto my-2 w-75 '>
          <label>Cost of Goods</label>
          <input
            className='shadow form-control' 
            onChange={costOfGoodHandler}
            value={costOfGoods}
            />
        </div>
        <div className='mx-auto my-2 w-75'>
          <label>Cost to Market</label>
          <input  
            className='shadow form-control' 
            onChange={costToMarketHandler}
            value={costToMarket}
            />
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-success my-5' type='submit'>SUBMIT</button>
        </div>
    </form>
    </div>}
    </div>
    )
}

export default CreateNewItem;