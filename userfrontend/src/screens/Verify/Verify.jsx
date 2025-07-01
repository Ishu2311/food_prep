import { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const navigate = useNavigate();
    console.log(success, orderId)
    const { url } = useContext(StoreContext)

    const verifyPayment = async() => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId })
            if (response.data.message === "Not Paid")
                navigate('/')
            else
                navigate("/myorders")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return ( <
        Loader / >
    )
}

export default Verify