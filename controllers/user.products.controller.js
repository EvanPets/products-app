const User = require('../models/user.model')

exports.findAll = async(req, res) => {
  console.log("find all users' products")

  try {
    const result = await User.find({}, {_id:0, username:1, products:1})
    res.status(200).json({data:result})
    console.log("Reading all users' products")
  } catch (err) {
    res.status(400).json({data:err})
    console.log("Problem in reading  users' products")
  }
}

exports.findOne = async(req, res) => {
  const username = req.params.username
  console.log("find products for user: ", username)

  try {
    const result = await User.findOne({username:username}, {_id:0, username:1, products:1})
    res.status(200).json({data:result})
    console.log("Success in finding products for user ", username )
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Problem in finding products for user ", username )
  }
}

exports.create = async(req, res) => {
  const username = req.params.username
  const products = req.params.products
  console.log("Insert products for user", username)

  try {
    const result = await User.updateOne(
      {username:username},
      {
        $push:{
          products:products
        }
      }
    )
    res.status(200).json({data:result})
    console.log("Success in updating products for user ", username )
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Problem in updating products for user ", username )
  }
}

exports.update = async(req, res) => {
  const username = req.params.username
  const _id = req.body.product._id
  const quantity = req.body.product.quantity

  console.log("Update products for user", username)

  try {
    const result = await User.updateOne(
      {username:username, "products.id_id":id},
      {
        $set:{
         "products.$.quantity" :quantity
        }
      }
    )
    res.status(200).json({data:result})
    console.log("Success in updating product for user ", username )
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Problem in updating product for user ", username )
  }
}

exports.delete = async(req, res) => {
  const username = req.params.username
  const _id = req.body.product._id

  console.log("Delete product")

  try {
    const result = await User.updateOne(
      {username:username},
      {
        $pull:{
         products: {_id:_id}
        }
      }
    )
    res.status(200).json({data:result})
    console.log("Success in deleting product for user ", username )
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Problem in deleting product for user ", username )
  }
}