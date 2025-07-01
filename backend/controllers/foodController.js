const foodModel = require('../model/foodModel')
const fsPromises = require('fs').promises
const path = require('path')

const addFood = async(req, res) => {
    let image_filename = "";
    if (req.file && req.file.filename) {
        image_filename = `${req.file.filename}`;
    } else {
        return res.status(400).json({ "message": "Image file is required" });
    }

    try {
        await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        })
        res.status(201).json({ "message": "Food added successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": error.message })
    }
}

const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find()
        res.status(200).json({ data: foods })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "error listing food" })
    }
}

const removeFood = async(req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ "message": "Food id is required" });
        }
        console.log(id);
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ "message": "Food not found" });
        }
        // Remove image file if exists
        if (food.image) {
            try {
                await fsPromises.unlink(path.join(__dirname, '..', 'uploads', `${food.image}`));
            } catch (err) {
                // Log error but continue with deletion
                console.log("Error deleting image file:", err.message);
            }
        }
        await foodModel.deleteOne({ _id: id });
        res.status(200).json({ "message": "Food deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "error deleting food" });
    }
}

module.exports = { addFood, listFood, removeFood };