const productModel =require("../model/Product");

exports.getProduct =async( req,res)=>{
    try {
        const product= await productModel.find();
        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.postProduct= async(req,res)=>{
    const { name, description,image,price} = req.body;
    try {
       const newProduct = new productModel({ name, description,image,price });
       await newProduct.save();
    res.status(201).json(newProduct); 
    } catch (error) {
        console.error("error in posting");
    res.status(500).json({ error: 'Server error' }); 
    }
}

exports.deleteProduct=async(req,res)=>{
    const id =req.params.id;
    const deleted=await productModel.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(204).json({message:"Record deleted"})
}

exports.updateProduct=async(req,res)=>{
    try {
        const id= req.params.id;
        const {name,description,price,image}=req.body;
    
        const updated=await productModel.findByIdAndUpdate(
            id,{name,description,price,image},{new:true}
        )
        if(!updated)
        {
            return res.status(404).json({message: "Product not found"})
        }
        res.json(updated)
    } catch (error) {
         console.error("error in posting");
    res.status(500).json({ error: 'Server error' }); 
    }
}