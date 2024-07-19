import React, { useState, useEffect } from "react";
import "../styles/Order.css";
import axios from "axios";

const Order = () => {
    const [data, setData] = useState([]);

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/order/delete?id=${id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setData(data.filter((order) => order.id !== id));
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/order/get", {
                    withCredentials: true,
                });
                setData(response.data.orders);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
        <h1>Orders</h1>
            {
                data.length === 0 ? <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/014/814/239/small/no-order-a-flat-rounded-icon-is-up-for-premium-use-vector.jpg"
                    className="img img-fluid"
                    alt=""
                /> :

                    <div className="menu-list">
                        
                        {data.map((order) => (
                            <div key={order.id} className="order-card">
                                <h2>Order ID: {order.id}</h2>
                                <h3>User ID: {order.user_id}</h3>
                                <div className="foods">
                                    {order.foods.map((food) => (
                                        <div key={food.food_id} className="food-item">
                                            <p>Food ID: {food.food_id}</p>
                                            <p>Price: ${food.price.toFixed(2)}</p>
                                            <p>Quantity: {food.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <h3>Total Amount: ${order.amount.toFixed(2)}</h3>
                                <button className="btn btn-danger" onClick={()=>deleteOrder(order.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
            }
        </>

    );
};

export default Order;
