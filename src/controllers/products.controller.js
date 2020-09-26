import Product from '../models/Product'

export const createProduct = async(req, res) => {
    const {
        name,
        category,
        price,
        imgUrl
    } = req.body;

    const product = new Product({
        name,
        category,
        price,
        imgUrl
    });

    await product.save();
    res.json('Creating Product');
}

export const getProducts = async(req, res) => {
    const products =  await Product.find();
    res.json( products )
}

export const getProductById = async(req, res) => {
    const id =  req.params.productId;
    const product =  await Product.findById(id);

     return res.json({
         data: product
     })

}

export const updateProductById = async(req, res) => {

    console.log(res.body);
    
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    });

    return res.json({
        product: updateProduct
    })
}

export const deleteProductById = async(req, res) => {   
        const id =  req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.status(201).json({
            msg: "Producto borrado con éxito."
        })
}