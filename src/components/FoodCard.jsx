
import Card from 'react-bootstrap/Card';
import "../styles/FoodCard.css";
import{useSelector,useDispatch} from 'react-redux'
import {addToCart} from "../redux/slice/cartSlice"
import { useEffect } from 'react';

function BasicExample({food}) {

  const {cartItems} =useSelector(state=>state.cart)
  const {isAuthenticated} =useSelector(state=>state.user)

  const dispatch =useDispatch()

  const handleAddToCart = (id) => {
    if(!isAuthenticated){
      window.location.href="/login"
    }
    const food_id=id
    dispatch(addToCart({food_id,quantity:1}))
  }



  return (
    <Card style={{ width: '18rem' }} className="food-card">
      <Card.Img variant="top" src={food.image?food.image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1009ssBJcKQ2pPnZdIn6c35R4lwJ6Ss4dLA&s"} />
      <Card.Body>
        {/* <Card.Title>{food.type==="non-veg"?"🟥":(food.type==="veg"?"🟩":"🟨")}</Card.Title> */}
        <Card.Title>{food.name} {food.type==="non-veg"?"🟥":(food.type==="veg"?"🟩":"🟨")}</Card.Title>
        <p>A$ {food.price}</p>
        {/* <p>{food.quantity}</p> */}
        <Card.Text>
        {food.description}
        </Card.Text>
        <button className='btn btn-primary' onClick={()=>handleAddToCart(food.id)} disabled={cartItems.some((item)=>item.food_id===food.id)}>Add to cart</button>
        
      </Card.Body>
    </Card>
  );
}

export default BasicExample;