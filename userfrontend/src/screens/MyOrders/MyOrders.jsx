import { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async() => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${url}/api/order/userorders`, { headers: { token } }
            );
            setData(response.data.data);
        } catch (error) {
            console.log('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [token]);

    if (isLoading) {
        return <Loader / > ;
    }

    return ( <
        div className = "my-orders" >
        <
        h2 > My Orders < /h2> <
        div className = "container" > {
            data.length > 0 ? (
                data.map((order, index) => ( <
                    div key = { index }
                    className = "my-orders-order" >
                    <
                    img src = { assets.parcel_icon }
                    alt = "Parcel" / >
                    <
                    p > {
                        order.items.map((item, itemIndex) =>
                            itemIndex === order.items.length - 1 ?
                            `${item.name} x ${item.quantity}` :
                            `${item.name} x ${item.quantity}, `
                        )
                    } <
                    /p> <
                    p > ₹{ order.amount } < /p> <
                    p > Items: { order.items.length } < /p> <p> <
                    span > < /span > <
                    b > { order.status } < /b> < /
                    p > <
                    button onClick = {
                        fetchOrders
                    } > Track Order < /button> < /
                    div >
                ))
            ) : ( <
                p > No orders found. < /p>
            )
        } <
        /div> < /
        div >
    );
};

export default MyOrders;