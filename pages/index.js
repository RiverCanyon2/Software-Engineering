import 'bootstrap/dist/css/bootstrap.css'


import { useState } from 'react';
import axios from 'axios';


export default function Home() {

  const [itemName, setItemName] = useState('');
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

  const submitFormHandler = async event => {
    event.preventDefault();

    const response = await axios.post('/api/create-item',{
      id: Math.random() * 10000,
      itemName,
      category,
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
      costToMarket
    });

    console.log(response);
  }

  const itemNameHandler = event => {
    setItemName(event.target.value);
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

  return (
    <div className='newItemBackground'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Wesley's Farm</a>
          <div className="container-fluid" id="navbarSupportedContent">
            <ul className="navbar-nav center justify-content-between">
            <li className="nav-item">
              <a className="nav-link">CREATE NEW ITEM</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">VEGETARIANS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">CARNIVORES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">SWEET TOOTHES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">CHECK-OUT</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
    <form className='bg-dark text-white w-50 mx-auto my-3 rounded shadow-lg' onSubmit={submitFormHandler}>
      <h2 className='h2 mb-4 text-center'>ADD NEW ITEM</h2>
      <div className='mx-auto my-2 w-75'>
        <label>Item Name</label>
        <input 
          className='shadow form-control' 
          onChange={itemNameHandler}
          value={itemName}
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
              <label>Total Carbohydrate</label>
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
    </div>
  )
}
