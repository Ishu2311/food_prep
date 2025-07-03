import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodCard from '../FoodCard/FoodCard';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return ( <
        div className = "food-display"
        id = "food-display" >
        <
        h2 > Top dishes near you < /h2> <
        div className = "food-display-list" > {
            food_list.map((item) => {
                if (category === "All" || item.category === category) {
                    return ( <
                        FoodCard key = { item._id }
                        id = { item._id }
                        name = { item.name }
                        price = { item.price }
                        description = { item.description }
                        image = { item.image }
                        />
                    );
                }
                return null;
            })
        } <
        /div> <
        /div>
    );
};

export default FoodDisplay;