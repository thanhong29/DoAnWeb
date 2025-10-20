const { getAllProduct, getProductBySlug, addProduct, deleteProduct } = require('../../../../../src/api/v1/services/product.service');

const handlerGetAllProduct = async (req, res) => {
    try {
        const allProduct = await getAllProduct();
        res.json({ success: true, product: allProduct });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const handlerGetProductBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug is required.' });
    }

    const product = await getProductBySlug(slug); // Trả về 1 object duy nhất

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Trả về nguyên object gốc
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const handlerAddProduct = async (req, res) => {
    try {
        console.log('Body nhận được:', req.body);
        console.log('File nhận được:', req.file);

        const { name, price, desc } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !price || !desc) {
            return res.status(400).json({ success: false, message: 'Thiếu trường bắt buộc' });
        }

        // Ảnh được upload qua Multer
        const imageUrl = req.file?.path || '';

        const productData = {
            name,
            price,
            desc,
            image: imageUrl,
        };

        // Gọi hàm addProduct (nếu bạn đã có service riêng)
        const newProduct = await addProduct(productData);

        res.json({
            success: true,
            message: 'Thêm sản phẩm thành công',
            product: newProduct,
        });
    } catch (error) {
        console.error('Lỗi backend:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi thêm sản phẩm: ' + error.message,
        });
    }
};


const handlerDeleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.json({ success: true, message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    handlerGetAllProduct,
    handlerGetProductBySlug,
    handlerAddProduct,
    handlerDeleteProduct,
};
