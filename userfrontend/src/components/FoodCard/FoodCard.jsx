import { useState, useContext, useEffect } from 'react';
import './FoodCard.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';


const FoodCard = ({ id, name, price, description, image }) => {
    const { cartItems, setCartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    return ( <
        div className = "food-item" >
        <
        div className = "food-item-image-container" >
        <
        img src = { `${url}/image/${image}` }
        alt = { name }
        className = "food-item-image" /
        > {!cartItems[id] ? ( <
                img onClick = {
                    () => addToCart(id) }
                src = { assets.add_icon_white }
                className = "add"
                alt = "Add" /
                >
            ) : ( <
                div className = "food-item-counter" >
                <
                img onClick = {
                    () => removeFromCart(id) }
                src = { assets.remove_icon_red }
                alt = "Remove" /
                >
                <
                p > { cartItems[id] } < /p> <
                img onClick = {
                    () => addToCart(id) }
                src = { assets.add_icon_green }
                alt = "Add" /
                >
                <
                /div>
            )
        } <
        /div> <
        div className = "food-item-info" >
        <
        p className = "food-item-name" > { name } < /p> <
        p className = "food-item-desc" > { description } < /p> <
        div className = "food-item-price-rating" >
        <
        p className = "food-item-price" > ₹{ price } < /p> <
        img src = { assets.rating_starts }
        alt = "rating"
        className = "food-item-rating" /
        >
        <
        /div> <
        /div> <
        /div>
    );
};

export default FoodCard;