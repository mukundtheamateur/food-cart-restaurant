import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Menu from './components/Menu';
import Cart from './components/Cart';
import Order from './components/Order';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './redux/slice/userSlice';
import {getCartItems} from './redux/slice/cartSlice'

function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadUser());
    dispatch(getCartItems());
  }, []);



  return (

    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
