import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Cart.css';

const Cart = () => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        url
    } = useContext(StoreContext);
    const navigate = useNavigate();


    return ( <
        div className = "cart" >
        <
        div className = "cart-items-title" >
        <
        p > Items < /p> <
        p > Title < /p> <
        p > Price < /p> <
        p > Quantity < /p> <
        p > Total < /p> <
        p > Modify < /p> < /
        div > <
        br / >
        <
        hr / > {
            food_list && food_list.length > 0 && Object.keys(cartItems).length > 0 ? (
                food_list.map((food, index) => {
                    if (cartItems[food._id] > 0) {
                        return ( <
                            div key = { food._id }
                            className = "cart-items-item" >
                            <
                            img src = { `${url}/image/${food.image}` }
                            alt = "" / >
                            <
                            p > { food.name } < /p> <
                            p > { food.price } < /p> <
                            p > { cartItems[food._id] } < /p> <
                            p > { cartItems[food._id] * food.price } < /p> <
                            div className = "food-item-counter cart-counter" >
                            <
                            img onClick = {
                                () => removeFromCart(food._id)
                            }
                            src = { assets.remove_icon_red }
                            alt = "Remove" /
                            >
                            <
                            p > { cartItems[food._id] } < /p> <
                            img onClick = {
                                () => addToCart(food._id)
                            }
                            src = { assets.add_icon_green }
                            alt = "Add" /
                            >
                            <
                            /div> < /
                            div >
                        );
                    } else {
                        return null;
                    }
                })
            ) : ( <
                div className = "cart-empty" >
                <
                p > Your cart is empty. < /p> < /
                div >
            )
        } <
        div className = "cart-bottom" >

        <
        div className = "cart-total" >

        <
        h2 > Cart Totals < /h2>  <
        div >

        <
        div className = "cart-total-details" >

        <
        p > Subtotal < /p>  <
        p > ₹{ getTotalCartAmount() } < /p>  < /
        div > <
        hr / >

        <
        div className = "cart-total-details" >

        <
        p > Delivery Fee < /p>  <
        p > ₹{ getTotalCartAmount() === 0 ? 0 : 20 } < /p>  < /
        div > <
        hr / >

        <
        div className = "cart-total-details" >

        <
        p > Total < /p>  <
        p > ₹{
            getTotalCartAmount() === 0 ?
            0 : getTotalCartAmount() + 20
        } <
        /p>  < /
        div > <
        /div>  <
        button onClick = {
            () => navigate('/order')
        } > Proceed to Checkout < /button>  < /
        div > <
        div className = "cart-promocode" >

        <
        p > If you have a promo code, Enter it here < /p>  <
        div className = "cart-promocode-input" >

        <
        input type = "text"
        placeholder = "Enter promo code" / >


        <
        button > Apply < /button>  < /
        div > <
        /div>  < /
        div > <
        /div>
    );
};

export default Cart;