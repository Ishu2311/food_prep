require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const connectDB = require('./config/dbConn')

//middleware
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use("/image", express.static("uploads"))

connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

//routes
//api endpoints

app.use('/api/food', require('./routes/foodRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/cart', require('./routes/cartRoute'))
app.use('/api/order', require('./routes/orderRoute'))

app.get("/", (req, res) => {
    res.send("API Working")
})
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})