const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: {
      type: String,
      require: [true, "The name is required"],
      unique: true,
    },
    weight: Number,
    image: String,
    price: Number,
    sku: String,
    indications: String,
  });

  ProductSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();
    product.id = _id;
    return product;
  };

  module.exports = model("product", ProductSchema, "products"); /**To check if it is products or Products */