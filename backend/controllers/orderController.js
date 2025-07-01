const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req, res) => {

    const frontend_url = "https://food-prepuserfrontend.onrender.com"
    try {
        const newOrder = await orderModel.create({
            userId: req.userId, //
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: 20 * 100,
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const verifyOrder = async(req, res) => {
    console.log(req.body)
    const { orderId, success } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ "message": "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ " message": "Not Paid" })
        }
    } catch (error) {
        console.log(error)
        res.json({ "message": "error" })
    }
}

const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId })
        res.status(200).json({ data: orders })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
}

const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find()
        res.json({ data: orders })
    } catch (error) {
        console.log(error)
        res.json({ message: "cannot fetch orders" })
    }
}

const updateState = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "state updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateState }