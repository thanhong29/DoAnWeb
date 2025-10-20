const express = require('express');
const router = express.Router();

const productRoute = require('./product.route');

router.use('/SanPham', productRoute);

module.exports = router;
