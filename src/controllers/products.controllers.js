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

const getProduct = async (req, res) => {

    try {
        const { id} = req.params
        const product = await Products.findById(id);

    return res.json({
        ok: true,
        msg: "Product retrieved successfully from the API.",
        data: product,
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
    getProducts, getProduct
};