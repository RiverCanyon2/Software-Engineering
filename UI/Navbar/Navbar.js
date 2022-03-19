import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link';

import { useContext } from 'react';
import { CheckoutContext } from './../../pages/_app'

const Navbar = () => {
  const { loggedIn, isAdmin} = useContext(CheckoutContext);

    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Wesley's Farm</a>
          <div className="container-fluid" id="navbarSupportedContent">
            <ul className="navbar-nav center justify-content-between " style={{position:'sticky'}}>
          {isAdmin &&  <li className="nav-item">
            <Link href='/create-new-item'>
              <a className="nav-link">ADMIN PANEL</a>
            </Link>
            </li>}
            <li className="nav-item">
              <Link href='/'>
                <a className="nav-link active" aria-current="page" >HOME</a>
              </Link>
            </li>
            {loggedIn && <li className="nav-item">
            <Link href='/vegetarians'>
              <a className="nav-link">
                VEGETARIANS
                </a>
            </Link>
            </li>}
            {loggedIn && <li className="nav-item">
            <Link href='/carnivore'>
              <a className="nav-link">CARNIVORES</a>
            </Link>
            </li>}
            {loggedIn &&<li className="nav-item">
            <Link href='/sweet-toothes'>
              <a className="nav-link">SWEET TOOTHES</a>
            </Link>
            </li>}
            {loggedIn && <li className="nav-item">
            <Link href='/check-out'>
              <a className="nav-link">CHECK-OUT</a>
            </Link>
            </li>}
        </ul>
      </div>
    </div>
  </nav>
    )
}

export default Navbar;