console.log("🔥 Orders routes loaded");

const express = require("express");
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


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

    // Find Product

    const productSnapshot = await db
      .collection("products")
      .where("name", "==", product)
      .limit(1)
      .get();

    if (productSnapshot.empty) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    const productDoc = productSnapshot.docs[0];
    const productData = productDoc.data();

    const currentStock = Number(productData.stock) || 0;

    if (currentStock < qty) {

      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });

    }

    // Reduce Stock

    await db
      .collection("products")
      .doc(productDoc.id)
      .update({
        stock: currentStock - qty,
      });

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

    const docRef = db
      .collection("orders")
      .doc(req.params.id);

    const oldDoc = await docRef.get();

    if (!oldDoc.exists) {

      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    }

    const updateData = {};

    if (req.body.customer !== undefined)
      updateData.customer = req.body.customer;

    if (req.body.product !== undefined)
      updateData.product = req.body.product;

    if (req.body.quantity !== undefined)
      updateData.quantity = Number(req.body.quantity);

    if (req.body.amount !== undefined)
      updateData.amount = Number(req.body.amount);

    if (req.body.status !== undefined)
      updateData.status = req.body.status;

    updateData.updatedAt = new Date();

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();

    res.json({
      success: true,
      message: "Order updated successfully",
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
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

    // Restore stock when deleting an order
    const productSnapshot = await db
      .collection("products")
      .where("name", "==", order.product)
      .limit(1)
      .get();

    if (!productSnapshot.empty) {

      const productDoc = productSnapshot.docs[0];
      const productData = productDoc.data();

      await db
        .collection("products")
        .doc(productDoc.id)
        .update({
          stock:
            (Number(productData.stock) || 0) +
            (Number(order.quantity) || 1),
        });

    }

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