const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');

const {
    handlerGetAllProduct,
    handlerGetProductBySlug,
    handlerAddProduct,
    handlerDeleteProduct,
} = require('../../controllers/client/product.controller');

router.get('/', handlerGetAllProduct);
router.get('/:slug', handlerGetProductBySlug);
router.post('/add', upload.single('image'), handlerAddProduct);
router.delete('/delete/:id', handlerDeleteProduct);

module.exports = router;
