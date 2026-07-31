console.log("Products routes loaded");

const express = require("express");
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL PRODUCTS
// ===============================

router.get("/", verifyToken, async (req,res)=>{

try{

console.log("USER UID:", req.user.uid);



const userSnap = await db
.collection("users")
.doc(req.user.uid)
.get();



if(!userSnap.exists){

return res.status(404).json({
success:false,
message:"User profile not found"
});

}



const userData = userSnap.data();



console.log(
"BUSINESS ID:",
userData.businessId
);



if(!userData.businessId){

return res.status(400).json({
success:false,
message:"No business assigned"
});

}



const snapshot = await db
.collection("products")
.where(
"businessId",
"==",
userData.businessId
)
.get();



const products = snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));



console.log(
"PRODUCTS FOUND:",
products.length
);



res.json({

success:true,

data:products

});


}
catch(error){

console.error(error);


res.status(500).json({

success:false,

message:error.message

});


}


});


// ===============================
// GET SINGLE PRODUCT
// ===============================

router.get("/:id", verifyToken, async(req,res)=>{


try{


const doc = await db
.collection("products")
.doc(req.params.id)
.get();



if(!doc.exists){

return res.status(404).json({

success:false,
message:"Product not found"

});

}



res.json({

success:true,

data:{
id:doc.id,
...doc.data()
}

});



}
catch(error){

console.error(error);


res.status(500).json({

success:false,
message:error.message

});


}



});




// ===============================
// ADD PRODUCT
// ===============================

router.post("/", verifyToken, async(req,res)=>{


try{


const {
name,
category,
price,
stock
}=req.body;



if(!name || !category){

return res.status(400).json({

success:false,
message:"Name and category required"

});

}



// GET USER BUSINESS

const userSnap = await db
.collection("users")
.doc(req.user.uid)
.get();



if(!userSnap.exists){

return res.status(404).json({

success:false,
message:"User profile missing"

});

}



const userData = userSnap.data();



const product = {


name,

category,

price:Number(price)||0,

stock:Number(stock)||0,


businessId:
userData.businessId,


createdBy:
req.user.uid,


createdAt:
new Date()

};



const doc = await db
.collection("products")
.add(product);



res.status(201).json({

success:true,

message:"Product added",

data:{
id:doc.id,
...product
}

});



}
catch(error){

console.error(error);


res.status(500).json({

success:false,
message:error.message

});


}



});





// ===============================
// UPDATE PRODUCT
// ===============================

router.put("/:id", verifyToken, async(req,res)=>{


try{


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

data:{
id:updated.id,
...updated.data()
}

});



}
catch(error){

console.error(error);


res.status(500).json({

success:false,
message:error.message

});

}


});





// ===============================
// DELETE PRODUCT
// ===============================


router.delete("/:id", verifyToken, async(req,res)=>{


try{


await db
.collection("products")
.doc(req.params.id)
.delete();



res.json({

success:true,

message:"Product deleted"

});



}
catch(error){

console.error(error);


res.status(500).json({

success:false,
message:error.message

});


}



});




module.exports = router;