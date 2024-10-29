//import model
import ProductModel from "../models/models.product.js"



// @desc create Product
// @method POST
// @route api/Product/createProduct
// @access private
export const createProduct = async(req, res) => {
    try{

        const createNewProduct = await ProductModel.create(req.body)
        const updatePricing = await ProductModel.findOneAndUpdate({_id :createNewProduct._id},{$set:{
                "Product_Variation" :req.body.Product_Variation
            }}, {
            new: true
        }).sort({createdAt: 1});
        res.json(updatePricing)

    }catch (e) {
        console.error("Error while trying to create Product",e)

        res.status(503).send({
            message:"Something went wrong while trying to create Product. Contact admin " + e
            ,error:e.message

        })
    }

}


// @desc Read Product details
// @route api/Product/readProduct/:ProductID
// @access private

export const readProductDetails = async(req, res) => {

    try{


          //    find the Product details with the id
        const foundProduct = await ProductModel.find({_id: req.params.productID, ...req.query}).populate('Category_ID').sort({createdAt: 1})

        //  if no records throw 404 error
        foundProduct.length > 0 ?  res.json( foundProduct) : res.status(404).send({
            message:"No records found" })


    }catch (e) {
        console.error("Error while trying to read Product",e)

        res.status(503).send({
            message:"Something went wrong while trying to read Product. Contact admin"
            ,error:e.message

        })
    }
}



// @desc Read all Product details
// @route api/Product/readAllProduct
// @access private

export const readAllProductDetails = async(req, res) => {

    try{
        //  find the Product  with the id
        const foundProduct = await ProductModel.find({...req.query}).populate('Category_ID').sort({createdAt: 1})
        //  if no records throw 404 error
        foundProduct.length > 0 ?  res.json( foundProduct) : res.status(404).send({
            message:"No records found" })


    }catch (e) {
        console.error("Error while trying to read all Products",e)
        res.status(503).send({
            message:"Something went wrong while trying to read Products. Contact admin"
            ,error:e.message

        })
    }
}



// @desc update Product details
// @method PUT
// @route api/Product/updateProductDetails/:ProductID
// @access private

export const updateProductDetails = async(req, res) => {
    try{

        const findProductID = await ProductModel.findOneAndUpdate({_id : req.params.productID}, req.body, {
            new: true
        }).sort({createdAt: 1});
        res.json(findProductID)
    }catch (e) {
        console.error("Error while trying to update Product details",e)
        res.status(503).send({
            message:"Something went wrong while trying to update the Product. Contact admin"
            ,error:e.message

        })
    }
}

// PRICE CRUD STARTS HERE
// @desc create Product price
// @method POST
// @route api/Product/createProductPrice/:productID
// @access private
export const createProductVariation = async(req, res) => {
    try{

            const newPricing = await ProductModel.findOneAndUpdate({_id :req.params.productID},{$push:{
               "Product_Variation" :req.body
                }}, {
                new: true,
                upsert:true
            }).sort({createdAt: 1});

        res.json(newPricing)

    }catch (e) {
        console.error("Error while trying to create Product",e)

        res.status(503).send({
            message:"Something went wrong while trying to create Product. Contact admin " + e
            ,error:e.message

        })
    }

}


// @desc update Product variation details
// @method PUT
// @route api/Product/updateProductVariationDetails/:productID/:variationID
// @access private

export const updateProductVariationDetails = async(req, res) => {
    try{

        //
        // const findProductID = await ProductModel.findOneAndUpdate({_id : req.params.productID, "Product_Variation._id" : req.params.variationID},
        //     //
        //     // {$push : {
        //     //     `Product_Variation.${req.params.variationID}.Product_Photos` : req.body.Product_Photos
        //     //       },
        //     // $set: {
        //     //     "Product_Variation" :(()=> {
        //     // const {Product_Photos, ...noProduct_Photos} = req.body
        //     // console.log("This is the bosy minus foros ", noProduct_Photos);
        //     // return noProduct_Photos
        // })()
        //     },
        //     }, {
        //
        //                       new: true,
        //                       upsert:true
        //                });
        // res.json(findProductID)
    }catch (e) {
        console.error("Error while trying to update Product details",e)

        res.status(503).send({
            message:"Something went wrong while trying to update the Product. Contact admin"
        })
    }
}


// @desc deactivate Product calendar instead of delete from db
// @route api/Productm/deleteProductm/:ProductmID
// @access private
export const deleteProduct = async(req, res) => {
    try{

        const findProductID = await ProductModel.findOneAndUpdate({_id : req.params.productID}, {
            "active":false
        }, {
            new: true
        });
        res.json(findProductID)

    }catch (e) {
        console.error("Error while trying to delete Product calendar",e)
        res.status(503).send({
            message:"Something went wrong while trying to delete the Product calendar"
            ,error:e.message

        })
    }



}

