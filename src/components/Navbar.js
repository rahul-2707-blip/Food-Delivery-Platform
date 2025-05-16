import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../screens/Cart';
import './styles.css';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { useCart , useDispatchCart  } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cart = useCart(); // access cart state
  const dispatch = useDispatchCart(); // access dispatch function

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav style={{ 'backgroundColor': '#F97300' }} className="navbar navbar-expand-lg navbar-dark bg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 playwrite-pe-font logo_style m-auto" to="#">Zinger</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="active fs-7 nav-link" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="active fs-5 nav-link" aria-current="page" to="myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            <div className='d-flex'>
              {!localStorage.getItem("authToken") ? (
                <div className='d-flex'>
                  <Link className="m-1 btn btn-dark" to="/login">Login</Link>
                  <Link className="m-1 btn btn-dark" to="/createuser">SignUp</Link>
                </div>
              ) : (
                <div className='d-flex'>
                  <div onClick={() => { setCartView(true); }} className='btn btn-dark text-white mx-1'>
                    My Cart {"  "}
                    <Badge pill bg='success'>{cart?.length || ""}</Badge> {/* Access cart length */}
                  </div>
                  {cartView ? <Modal onClose={() => { setCartView(false); }}><Cart /></Modal> : null}
                  <div className='btn btn-dark text-danger mx-2' onClick={handleLogout}>
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
