console.log("🔥 Orders routes loaded");

const express = require("express");
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();
// =======================================
// PRODUCT HELPERS
// =======================================

async function findProductByName(productName) {
  const snapshot = await db
    .collection("products")
    .where("name", "==", productName)
    .limit(1)
    .get();
    console.log("Searching for product:", productName);
console.log("Documents found:", snapshot.size);
    

  if (snapshot.empty) return null;

  return snapshot.docs[0];
}

async function increaseStock(productName, qty) {
  const productDoc = await findProductByName(productName);

  if (!productDoc) return;

  const data = productDoc.data();

  await productDoc.ref.update({
    stock: (Number(data.stock) || 0) + Number(qty),
  });
}

async function decreaseStock(productName, qty) {
  const productDoc = await findProductByName(productName);

console.log("Product Name:", productName);
console.log("Product Found:", !!productDoc);
  if (!productDoc) {
    throw new Error("Product not found");
  }

  const data = productDoc.data();

  const stock = Number(data.stock) || 0;

  if (stock < qty) {
    throw new Error(
      `Only ${stock} item(s) available in stock`
    );
  }

  await productDoc.ref.update({
    stock: stock - Number(qty),
  });
}


// ===============================
// TEST ROUTE
// ===============================

router.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST orders working",
    body: req.body,
  });
});


// ===============================
// GET ALL ORDERS
// ===============================

router.get("/", verifyToken, async (req, res) => {
  try {

    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: orders,
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
// GET SINGLE ORDER
// ===============================

router.get("/:id", verifyToken, async (req, res) => {

  try {

    const doc = await db
      .collection("orders")
      .doc(req.params.id)
      .get();

    if (!doc.exists) {

      return res.status(404).json({
        success: false,
        message: "Order not found",
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
      success: false,
      message: error.message,
    });

  }

});


// ===============================
// ADD ORDER + REDUCE PRODUCT STOCK
// ===============================

router.post("/", verifyToken, async (req, res) => {

  try {

    console.log("========= NEW ORDER =========");
    console.log("Request Body:", req.body);

    const {
      customer,
      product,
      quantity,
      amount,
      status,
    } = req.body;
    if (!customer || !product || amount === undefined) {

      return res.status(400).json({
        success: false,
        message: "Customer, product and amount are required",
      });

    }

    const qty = Number(quantity) || 1;

    await decreaseStock(product, qty);
    const order = {

      customer,
      product,
      quantity: qty,
      amount: Number(amount),
      status: status || "Pending",

      createdAt: new Date(),

      createdBy: req.user.uid,
    };

    const orderRef = await db
      .collection("orders")
      .add(order);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        id: orderRef.id,
        ...order,
      },
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
// UPDATE ORDER
// ===============================

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const docRef = db.collection("orders").doc(req.params.id);

    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const oldOrder = snapshot.data();

    const newProduct =
      req.body.product ?? oldOrder.product;

    const newQty =
      Number(req.body.quantity) ||
      Number(oldOrder.quantity);

    const oldProduct = oldOrder.product;

    const oldQty = Number(oldOrder.quantity) || 1;

    // Restore old stock

    await increaseStock(oldProduct, oldQty);

    try {
      // Deduct new stock

      await decreaseStock(newProduct, newQty);
    } catch (err) {
      // rollback

      await decreaseStock(oldProduct, oldQty);

      throw err;
    }

    const updateData = {
      ...req.body,
      quantity: newQty,
      amount:
        req.body.amount !== undefined
          ? Number(req.body.amount)
          : oldOrder.amount,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);

    const updated = await docRef.get();

    res.json({
      success: true,
      message: "Order updated successfully",
      data: {
        id: updated.id,
        ...updated.data(),
      },
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
// DELETE ORDER
// ===============================

router.delete("/:id", verifyToken, async (req, res) => {
  try {

    const docRef = db
      .collection("orders")
      .doc(req.params.id);

    const orderDoc = await docRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = orderDoc.data();

    // Restore stock when deleting the order
    await increaseStock(
      order.product,
      Number(order.quantity) || 1
    );

    await docRef.delete();

    res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


module.exports = router;