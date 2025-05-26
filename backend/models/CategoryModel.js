const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    label: String,
    value: String,
});

const CategoryModel = mongoose.model('category', productCategorySchema);

module.exports = CategoryModel;