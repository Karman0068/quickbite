const foodModel = require("../models/FoodModel");
const cloudinary = require("../config/cloudinary");

exports.addFood = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "food-items", resource_type: "image" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: result.secure_url,
            image_public_id: result.public_id
        });

        await food.save();
        res.json({ success: true, message: "Food item added successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

exports.listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

exports.removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        // Delete image from Cloudinary
        if (food.image_public_id) {
            await cloudinary.uploader.destroy(food.image_public_id);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting food item." });
    }
};
