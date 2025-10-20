const ProductModel = require('../models/product.model');

const getAllProduct = async () => {
    return await ProductModel.find({}).sort({ createdAt: -1 });
};

const getProductBySlug = async (slug) => {
    return await ProductModel.findOne({ slug });
};

const addProduct = async (data) => {
    return await ProductModel.create(data);
};

const deleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
};

module.exports = {
    getAllProduct,
    getProductBySlug,
    addProduct,
    deleteProduct,
};
