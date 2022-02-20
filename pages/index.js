import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link';


import { useState, useContext } from 'react';
import { CheckoutContext } from './_app';
import axios from 'axios';


export default function Home() {
  const { loggedIn, setLoggedIn, isAdmin, setIsAdmin } = useContext(CheckoutContext);

  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [users, setUsers] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);

  const signInHandler = () => {
    setSignUp(false);
    setSignIn(true);
  }

  const signUpHandler = () => {
    setSignIn(false);
    setSignUp(true);
  }
  const cancelHandler = () => {
    setSignIn(false);
    setSignUp(false);
  }

  const usernameHandler = event => {
    setUsername(event.target.value);
  }
  const passwordHandler = event => {
    setPassword(event.target.value);
    setPasswordError(false);
  }
  const confirmPasswordHandler = event => {
    setConfirmPassword(event.target.value);
    setPasswordError(false);
  }

  const signUpSubmitHandler = async event => {
    event.preventDefault();

    if(password !== confirmPassword) {
      setPasswordError(true);
    }else {
      const response = await axios.post('/api/create-user', {
        username,
        password
      });
      
    }
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setLoggedIn(true);
  }

  const signInSubmitHandler = async event => {
    event.preventDefault();

    const response = await axios.get('/api/validate-user');

    const data = response.data;
    await data.map((user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    users.filter((individual) => {
      if ((individual.username === username) && (individual.password === password)) {
        if((individual.username === "WINNERS") && (individual.password === "Password1234")) {
          setIsAdmin(true);
        }
        setLoggedIn(true);
      }
      else{
        setUserNotFound(true);
      }
    })
  }


  return (
    <div className='newItemBackground w-100'>
  <div className='text-center my-5'>
    {!loggedIn && <button type="button" className="btn btn-dark btn-lg my-4 mx-5" onClick={signInHandler}>SIGN IN</button>}
    {!loggedIn && <button type='button' className='btn btn-dark btn-lg my-4 mx-5' onClick={signUpHandler}>SIGN UP</button>}
  </div>
  {(signIn && !loggedIn)  &&
    <form className='w-50 bg-light mx-auto' onSubmit={signInSubmitHandler}>
      <h3 className='h3 text-center'>WELCOME BACK</h3>
      <input
        className='form-control shadow my-2 w-75 mx-auto'
        placeholder='Username'
        value={username}
        onChange={usernameHandler}
      />
      <input
        className='form-control shadow my-2 w-75 mx-auto'
        placeholder='Password'
        value={password}
        onChange={passwordHandler}
        type='password'
        />
        {userNotFound && <p className='text-danger text-center'>Username or Password Incorrect</p>}
        <div className='text-center'>
          <button type='submit' className='btn btn-primary my-2 mx-2'>SIGN IN</button>
          <button onClick={cancelHandler} className='btn btn-secondary my-2 mx-2'>CANCEL</button> 
        </div>
    </form>
  }
  {(signUp && !loggedIn) && 
    <form className='w-50 bg-light mx-auto' onSubmit={signUpSubmitHandler}>
      <h3 className='h3 text-center'>WELCOME</h3>
        <input
          className='form-control shadow my-2 w-75 mx-auto'
          placeholder='Username'
          value={username}
          onChange={usernameHandler}
        />
        <input
          className='form-control shadow my-2 w-75 mx-auto'
          placeholder='Password'
          value={password}
          onChange={passwordHandler}
          type='password'
          />
          <input
          className='form-control shadow my-2 w-75 mx-auto'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          type='password'
          />
          {passwordError && <div className='text-center'><p className='text-danger'>Error: Passwords do not match</p></div>}
          <div className='text-center '>
            <button type='submit' className='btn btn-primary my-2'>SIGN UP</button>
            <button onClick={cancelHandler} className='btn btn-secondary my-2 mx-2'>CANCEL</button> 
          </div>
    </form>
  }
  {loggedIn && 
    <div className='container'>
      <div className='card col-12 shadow-lg' style={{background: "linear-gradient(to right, #5cb85c, black)", color: 'white'}}>
        <div className='card-body'>
          <h2 className='card-title'>
            WELCOME TO WESLEYS
          </h2>
        </div>
      </div>
      <div className='row justify-content-between'>
      <div className='card col-lg-3 ms-3 shadow-lg bg-dark mt-2'>
      <Link href='/carnivore'>
        <div className='card-body'>
            <img 
              src='https://images.pexels.com/photos/6896518/pexels-photo-6896518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              className='card-img-top round h-75'
              alt='MEAT'
            />
            <h4 className='card-title text-light text-center'>
              CARNIVORES
            </h4>
            <div className='text-center'>
            <button type='button' className='btn rounded' style={{background: "linear-gradient(to right, #5cb85c, black)", color: 'white'}}>
              CHOW TIME
            </button>
            </div>
          </div>
          </Link>
      </div>
      <div className='card col-lg-3 shadow-lg mt-2 bg-dark text-light '>
      <Link href='/vegetarians'>
      <div className='card-body' >
            <img 
              src='https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              className='card-img-top round h-75'
              alt='Vegetables'
            />
            <h4 className='card-title text-center'>
              VEGETARIANS
            </h4>
            <div className='text-center'>
            <button type='button' className='btn rounded' style={{background: "linear-gradient(to right, #5cb85c, black)", color: 'white'}}>
              CHOW TIME
            </button>
            </div>
          </div>
          </Link>
      </div>
      <div className='card col-lg-3 me-3 shadow-lg mt-2 bg-dark text-light'>
      <Link href='/sweet-toothes'>
      <div className='card-body '>
            <img 
              src='https://images.pexels.com/photos/5996524/pexels-photo-5996524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              className='card-img-top rounded-lg h-75'
              alt='Sweet Treats'
              style={{opacity: '.8'}}
            />
            <h4 className='card-title text-center'>
              SWEET TOOTHS
            </h4>
            <div className='text-center'>
            <button type='button' className='btn rounded' style={{background: "linear-gradient(to right, #5cb85c, black)", color: 'white'}}>
              CHOW TIME
            </button>
            </div>
          </div>
        </Link>
      </div>
      </div>
      
    </div>
  }
    </div>
  )
}
