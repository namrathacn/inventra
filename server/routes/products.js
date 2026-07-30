console.log("Products routes loaded");

const express = require("express");
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// TEST ROUTES
// ===============================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "GET test working",
  });
});


router.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST test working",
    body: req.body,
  });
});


// ===============================
// GET ALL PRODUCTS
// ===============================

router.get("/", verifyToken, async (req, res) => {

  try {

    const snapshot = await db
      .collection("products")
      .get();


    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    res.status(200).json({
      success: true,
      data: products,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



// ===============================
// GET SINGLE PRODUCT
// ===============================

router.get("/:id", verifyToken, async (req, res) => {

  try {

    const doc = await db
      .collection("products")
      .doc(req.params.id)
      .get();


    if (!doc.exists) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    res.json({

      success: true,

      data: {
        id: doc.id,
        ...doc.data(),
      },

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

});



// ===============================
// ADD PRODUCT
// ===============================

router.post("/", verifyToken, async (req, res) => {

  try {

    const {
      name,
      category,
      price,
      stock,
    } = req.body;



    if (!name || !category) {

      return res.status(400).json({

        success:false,

        message:"Name and category are required",

      });

    }



    const product = {


      name,

      category,

      price:Number(price) || 0,

      stock:Number(stock) || 0,


      createdAt:new Date(),

      createdBy:req.user.uid,

    };



    const doc = await db
      .collection("products")
      .add(product);



    res.status(201).json({

      success:true,

      message:"Product added successfully",

      data:{
        id:doc.id,
        ...product,
      },

    });



  } catch(error){

    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

});



// ===============================
// UPDATE PRODUCT
// ===============================

router.put("/:id", verifyToken, async (req,res)=>{


  try {


    await db
      .collection("products")
      .doc(req.params.id)
      .update(req.body);



    const updated = await db
      .collection("products")
      .doc(req.params.id)
      .get();



    res.json({

      success:true,

      message:"Product updated successfully",

      data:{
        id:updated.id,
        ...updated.data(),
      },


    });



  } catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


});



// ===============================
// DELETE PRODUCT
// ===============================

router.delete("/:id", verifyToken, async(req,res)=>{


  try {


    await db
      .collection("products")
      .doc(req.params.id)
      .delete();



    res.json({

      success:true,

      message:"Product deleted successfully",

    });



  } catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


});



module.exports = router;