import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//const url = "https://food-prepbackend.onrender.com"
const url = "http://localhost:4000"

const App = () => {

        // const url = 'https://foodprep.onrender.com'
        //const url = 'http://localhost:4000'
        return ( <
                div className = 'app' >
                <
                ToastContainer / >
                <
                Navbar / >
                <
                hr / >
                <
                div className = "app-content" >
                <
                Sidebar / >
                <
                Routes >
                <
                Route path = '/'
                element = { < Add url = { url }
                    />} / >
                    <
                    Route path = '/add'
                    element = { < Add url = { url }
                        />} / >
                        <
                        Route path = '/list'
                        element = { < List url = { url }
                            />} / >
                            <
                            Route path = '/orders'
                            element = { < Orders url = { url }
                                />} / >
                                <
                                /Routes> < /
                                div > <
                                /div>
                            )
                        }

                        export default App