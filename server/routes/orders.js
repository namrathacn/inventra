console.log("🔥 Orders routes loaded");

const express = require("express");
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// =======================================
// GET USER BUSINESS
// =======================================

async function getUserBusiness(uid) {

  const userSnap = await db
    .collection("users")
    .doc(uid)
    .get();


  if (!userSnap.exists) {
    throw new Error("User profile not found");
  }


  const userData = userSnap.data();


  if (!userData.businessId) {
    throw new Error("No business assigned");
  }


  return userData;

}



// =======================================
// PRODUCT HELPERS
// =======================================


async function findProductByName(productName, businessId) {

  const snapshot = await db
    .collection("products")
    .where("name", "==", productName)
    .where("businessId", "==", businessId)
    .limit(1)
    .get();


  if (snapshot.empty) {
    return null;
  }


  return snapshot.docs[0];

}





async function increaseStock(
  productName,
  qty,
  businessId
) {


  const productDoc =
    await findProductByName(
      productName,
      businessId
    );


  if (!productDoc) {
    return;
  }


  const data = productDoc.data();


  await productDoc.ref.update({

    stock:
      (Number(data.stock) || 0)
      +
      Number(qty)

  });


}





async function decreaseStock(
  productName,
  qty,
  businessId
) {


  const productDoc =
    await findProductByName(
      productName,
      businessId
    );


  if (!productDoc) {

    throw new Error(
      "Product not found"
    );

  }


  const data = productDoc.data();


  const stock =
    Number(data.stock) || 0;



  if(stock < qty){

    throw new Error(
      `Only ${stock} item(s) available`
    );

  }



  await productDoc.ref.update({

    stock:
      stock -
      Number(qty)

  });


}




// =======================================
// GET ALL ORDERS
// =======================================


router.get("/", verifyToken, async(req,res)=>{


try{


const userData =
await getUserBusiness(
req.user.uid
);



const snapshot =
await db
.collection("orders")
.where(
  "businessId",
  "==",
  userData.businessId
)
.get();



const orders = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .sort((a, b) => {
    const t1 = a.createdAt?.seconds || 0;
    const t2 = b.createdAt?.seconds || 0;
    return t2 - t1;
  });



console.log(
"ORDER BUSINESS:",
userData.businessId
);


console.log(
"ORDERS FOUND:",
orders.length
);



res.json({

success:true,

data:orders

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






// =======================================
// GET SINGLE ORDER
// =======================================


router.get("/:id",verifyToken,async(req,res)=>{


try{


const userData =
await getUserBusiness(
req.user.uid
);



const doc =
await db
.collection("orders")
.doc(req.params.id)
.get();



if(!doc.exists){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



const order =
doc.data();



if(order.businessId !== userData.businessId){

return res.status(403).json({

success:false,

message:"Unauthorized"

});

}



res.json({

success:true,

data:{
id:doc.id,
...order
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






// =======================================
// CREATE ORDER
// =======================================


router.post("/",verifyToken,async(req,res)=>{


try{


const userData =
await getUserBusiness(
req.user.uid
);



const {

customer,

product,

quantity,

amount,

status

}=req.body;



if(
!customer ||
!product ||
amount===undefined
){

return res.status(400).json({

success:false,

message:
"Customer, product and amount required"

});

}



const qty =
Number(quantity)||1;



await decreaseStock(

product,

qty,

userData.businessId

);




const order = {


customer,


product,


quantity:qty,


amount:Number(amount),


status:
status || "Pending",


businessId:
userData.businessId,


createdAt:
new Date(),


createdBy:
req.user.uid


};




const orderRef =
await db
.collection("orders")
.add(order);



res.status(201).json({

success:true,

message:
"Order created successfully",

data:{
id:orderRef.id,
...order
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






// =======================================
// UPDATE ORDER
// =======================================


router.put("/:id",verifyToken,async(req,res)=>{


try{


const userData =
await getUserBusiness(
req.user.uid
);



const orderRef =
db.collection("orders")
.doc(req.params.id);



const snapshot =
await orderRef.get();



if(!snapshot.exists){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



const oldOrder =
snapshot.data();



if(
oldOrder.businessId !== userData.businessId
){

return res.status(403).json({

success:false,

message:"Unauthorized"

});

}



const newProduct =
req.body.product ??
oldOrder.product;



const newQty =
Number(req.body.quantity)
||
Number(oldOrder.quantity);



// restore old stock

await increaseStock(

oldOrder.product,

Number(oldOrder.quantity),

userData.businessId

);



// remove new stock

await decreaseStock(

newProduct,

newQty,

userData.businessId

);




await orderRef.update({

...req.body,

quantity:newQty,


amount:
req.body.amount !== undefined
?
Number(req.body.amount)
:
oldOrder.amount,


updatedAt:new Date()


});



res.json({

success:true,

message:
"Order updated successfully"

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







// =======================================
// DELETE ORDER
// =======================================


router.delete("/:id",verifyToken,async(req,res)=>{


try{


const userData =
await getUserBusiness(
req.user.uid
);



const orderRef =
db.collection("orders")
.doc(req.params.id);



const snapshot =
await orderRef.get();



if(!snapshot.exists){

return res.status(404).json({

success:false,

message:"Order not found"

});

}



const order =
snapshot.data();



if(
order.businessId !== userData.businessId
){

return res.status(403).json({

success:false,

message:"Unauthorized"

});

}



await increaseStock(

order.product,

Number(order.quantity),

userData.businessId

);



await orderRef.delete();



res.json({

success:true,

message:
"Order deleted successfully"

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