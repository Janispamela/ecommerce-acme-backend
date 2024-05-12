const Products = require("../models/products");

const getProducts = async (req, res) => {

    try {
        const products = await Products.find();

    return res.json({
        ok: true,
        msg: "Products retrieved successfully from the API.",
        data: products,
    });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Internal Server Error",
            data: [],
        });
    }
};

module.exports = {
    getProducts,
};