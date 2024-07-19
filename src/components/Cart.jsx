import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import { getCartItems, cartQtyIncDec, clearCart, cartRemove } from "../redux/slice/cartSlice"

function Cart() {
    const [data, setData] = useState([]);

    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    const removeFromCart = (id) => {
        try{
            console.log("food id which is going to be deleted: ", id)
            dispatch(cartRemove({ food_id: id }))
        }finally{
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = cartItems.map((item) => item.food_id);

                let cartData = await axios.get("http://localhost:4000/menu/getbyid", {
                    params: {
                        foodIds: items.join(',') // Join the array into a comma-separated string
                    },
                    withCredentials: true
                });
                console.log("cartData is", cartData)
                cartData = cartData.data.menu;
                // console.log("cartData is",cartData)

                cartData = cartData.map((item) => {
                    const cartItem = cartItems.find((cartItem) => cartItem.food_id === item.id);
                    return {
                        ...item,
                        quantity: cartItem ? cartItem.quantity : 0
                    };
                });

                setData(cartData);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchData();
        }

    }, [cartItems]);

    useEffect(() => {
        dispatch(getCartItems())
    }, []);

    const handleIncrease = (id) => {
        const index = data.findIndex((item) => item.id === id);
        let quantity = data[index].quantity + 1;
        const food_id = id;
        dispatch(cartQtyIncDec({ food_id, quantity }))
        // window.location.reload();
    }

    const handleDecrease = (id) => {
        // Handle decrease quantity logic here
        const index = data.findIndex((item) => item.id === id);
        if (data[index].quantity <= 1) {
            return;
        }
        const food_id = id;
        let quantity = data[index].quantity - 1;
        dispatch(cartQtyIncDec({ food_id, quantity }))
        data[index].quantity -= 1;

    }

    const handlePlaceOrder = async () => {
        try {
            console.log(cartItems)
            const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const res = await axios.post("http://localhost:4000/order/create", { foodDetails: cartItems, total: total }, { withCredentials: true });

            if (res.status === 200) {
                dispatch(clearCart())
                window.location.href = "/order"
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Cart</h1>
            {
                data.length === 0 && <img src="https://www.buy.airoxi.com/img/empty-cart-1.png" className='img img-fluid'></img>
            }
            {data.map((item) => (
                <div key={item.id} className='row' style={{ padding: "2vw" }}>
                    <h2 className='col-3' style={{ textAlign: "left" }}>{item.name}</h2>
                    <p className='col-3'>{item.description}</p>
                    <div className='col-2'>
                        <button className='btn btn-danger mx-2 px-3' onClick={() => handleDecrease(item.id)}>-</button>
                        <span style={{ fontSize: "20px" }}>{item.quantity}</span>
                        <button className='btn btn-success mx-2 px-3' onClick={() => handleIncrease(item.id)}>+</button>
                    </div>
                    <p className='col-2'>A$ {item.price * item.quantity}</p>
                    <button className='btn btn-danger' style={{width: "100px", marginLeft: "20px"}} onClick={()=>removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            {
                data.length > 0 && <><div className='row'>
                    <div className='col-10' style={{ textAlign: "right", paddingRight: "30px" }}>Total: A$ {data.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
                </div>
                    <div className='row p-3'>
                        <div className='col-7'></div>
                        <button onClick={handlePlaceOrder} className='col-5 btn btn-success' style={{ fontSize: "20px" }}>Place Order</button>
                    </div></>
            }
        </div>
    );
}

export default Cart;
