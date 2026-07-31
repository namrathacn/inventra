import {
  FiPlus,
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";
import { useSearch } from "../../context/SearchContext";
import { useData } from "../../context/DataContext";

import api from "../../services/api";
import toast from "react-hot-toast";

export default function Orders() {
  const {
    currencySymbol,
    convertAmount,
  } = useCurrency();

  const {
    search,
    addSearchItems,
  } = useSearch();

  const {
    orders,
    loadOrders,
    products,
    loadProducts,
  } = useData();

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editOrder, setEditOrder] = useState(null);

  const [form, setForm] = useState({
    customer: "",
    product: "",
    quantity: "",
    status: "Pending",
  });

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  useEffect(() => {
    if (orders.length) {
      addSearchItems(
        orders.map((order) => ({
          name: order.customer,
          type: "Order",
          path: "/orders",
        }))
      );
    }
  }, [orders]);

  function openAdd() {
    setEditOrder(null);

    setForm({
      customer: "",
      product: "",
      quantity: "",
      status: "Pending",
    });

    setShowModal(true);
  }

  function openEdit(order) {
    setEditOrder(order);

    setForm({
      customer: order.customer || "",
      product: order.product || "",
      quantity: order.quantity || "",
      status: order.status || "Pending",
    });

    setShowModal(true);
  }

  function handleProductChange(productName) {
    setForm((prev) => ({
      ...prev,
      product: productName,
    }));
  }

  const selectedProduct = products.find(
    (p) => p.name === form.product
  );

  const unitPrice = Number(selectedProduct?.price || 0);

  const totalAmount =
    unitPrice * (Number(form.quantity) || 0);

  async function saveOrder(e) {
    e.preventDefault();

    if (
      !form.customer ||
      !form.product ||
      !form.quantity
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const requestedQty =
      Number(form.quantity) || 1;

    if (
      !editOrder &&
      selectedProduct &&
      requestedQty > Number(selectedProduct.stock)
    ) {
      toast.error(
        `Only ${selectedProduct.stock} item(s) available`
      );
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: form.customer,
        product: form.product,
        quantity: requestedQty,
        amount: totalAmount,
        status: form.status,
      };

      if (editOrder) {
        await api.put(
          `/orders/${editOrder.id}`,
          orderData
        );

        toast.success("Order updated");
      } else {
        await api.post(
          "/orders",
          orderData
        );

        toast.success("Order added");
      }

      await Promise.all([
        loadOrders(),
        loadProducts(),
      ]);

      setShowModal(false);

      setEditOrder(null);

      setForm({
        customer: "",
        product: "",
        quantity: "",
        status: "Pending",
      });
    } catch (error) {
      console.error(
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save order"
      );
    }

    setLoading(false);
  }

  async function deleteOrder(id) {
    if (!window.confirm("Delete this order?"))
      return;

    try {
      await api.delete(`/orders/${id}`);

      toast.success("Order deleted");

      await Promise.all([
        loadOrders(),
        loadProducts(),
      ]);
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  }

  const filteredOrders = orders.filter((order) => {
    const text = search.toLowerCase();

    return (
      order.customer
        ?.toLowerCase()
        .includes(text) ||
      order.product
        ?.toLowerCase()
        .includes(text)
    );
  });
return (

<DashboardLayout>

<div className="space-y-8">

  {/* Header */}

  <div
    className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      flex
      justify-between
      items-center
    "
  >

    <div>

      <h1 className="text-3xl font-bold text-white">
        Orders
      </h1>

      <p className="text-slate-400 mt-1">
        Manage customer orders
      </p>

    </div>

    <button
      onClick={openAdd}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        px-5
        py-3
        font-semibold
        text-white
        shadow-lg
        shadow-cyan-500/20
        hover:scale-105
        transition
      "
    >
      <FiPlus />
      Add Order
    </button>

  </div>

  {/* Orders */}

  <div className="space-y-5">

    {filteredOrders.map((order) => (

      <motion.div
        key={order.id}
        whileHover={{ scale: 1.015 }}
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div
              className="
                h-16
                w-16
                rounded-2xl
                bg-cyan-500/15
                flex
                items-center
                justify-center
              "
            >
              <FiShoppingCart
                className="text-cyan-400 text-2xl"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                {order.customer}
              </h2>

              <p className="text-slate-400">
                {order.product}
              </p>

              <p className="mt-2 text-white font-semibold">
                {currencySymbol}
                {Math.round(
                  convertAmount(order.amount)
                ).toLocaleString()}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Quantity : {order.quantity}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <span
              className={`

                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm

                ${
                  order.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }

              `}
            >

              {order.status === "Completed" ? (
                <FiCheckCircle />
              ) : order.status === "Pending" ? (
                <FiClock />
              ) : (
                <FiXCircle />
              )}

              {order.status}

            </span>

            <button
              onClick={() => openEdit(order)}
              className="
                text-cyan-400
                hover:text-cyan-300
                transition
              "
            >
              <FiEdit2 size={18} />
            </button>

            <button
              onClick={() => deleteOrder(order.id)}
              className="
                text-red-400
                hover:text-red-300
                transition
              "
            >
              <FiTrash2 size={18} />
            </button>

          </div>

        </div>

      </motion.div>

    ))}

    {filteredOrders.length === 0 && (

      <div
        className="
          rounded-3xl
          border
          border-dashed
          border-white/10
          bg-white/5
          p-10
          text-center
        "
      >

        <FiShoppingCart
          className="
            mx-auto
            text-5xl
            text-slate-500
            mb-4
          "
        />

        <h3 className="text-white text-xl font-semibold">
          No Orders Found
        </h3>

        <p className="text-slate-400 mt-2">
          Create your first order.
        </p>

      </div>

    )}

  </div>
  {
showModal && (

<div
  className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/70
    backdrop-blur-md
  "
>

  <div
    className="
      w-full
      max-w-md
      rounded-3xl
      border
      border-white/20
      bg-[#07111f]/90
      backdrop-blur-2xl
      shadow-2xl
      shadow-cyan-500/10
      p-8
    "
  >

    {/* Header */}

    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-2xl font-bold text-white">

        {editOrder ? "Edit Order" : "Add Order"}

      </h2>

      <button
        onClick={() => setShowModal(false)}
        className="
          text-slate-400
          hover:text-white
          transition
        "
      >
        <FiX size={24} />
      </button>

    </div>

    <form
      onSubmit={saveOrder}
      className="space-y-5"
    >

      {/* Customer */}

      <input
        type="text"
        placeholder="Customer Name"
        value={form.customer}
        onChange={(e) =>
          setForm({
            ...form,
            customer: e.target.value,
          })
        }
        className="
          w-full
          rounded-xl
          border
          border-white/20
          bg-white/10
          p-3
          text-white
          placeholder:text-slate-400
          outline-none
          focus:border-cyan-400
        "
      />

      {/* Product */}

      <select
        value={form.product}
        onChange={(e) =>
          handleProductChange(e.target.value)
        }
        className="
          w-full
          rounded-xl
          border
          border-white/20
          bg-white/10
          p-3
          text-white
          outline-none
          cursor-pointer
          focus:border-cyan-400
        "
      >

        <option
          value=""
          className="bg-[#07111f]"
        >
          Select Product
        </option>

        {products.map((product) => (

          <option
            key={product.id}
            value={product.name}
            className="bg-[#07111f]"
          >
            {product.name} • Stock: {product.stock}
          </option>

        ))}

      </select>

      {/* Quantity */}

      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({
            ...form,
            quantity: e.target.value,
          })
        }
        className="
          w-full
          rounded-xl
          border
          border-white/20
          bg-white/10
          p-3
          text-white
          placeholder:text-slate-400
          outline-none
          focus:border-cyan-400
        "
      />

      {/* Product Summary */}

      {selectedProduct && (

        <div
          className="
            rounded-2xl
            border
            border-cyan-500/20
            bg-cyan-500/10
            p-4
            space-y-3
          "
        >

          <div className="flex justify-between">

            <span className="text-slate-400">
              Unit Price
            </span>

            <span className="font-semibold text-white">
              {currencySymbol}
              {unitPrice.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-400">
              Available Stock
            </span>

            <span className="font-semibold text-cyan-300">
              {selectedProduct.stock}
            </span>

          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between">

            <span className="font-semibold text-white">
              Total Amount
            </span>

            <span className="font-bold text-cyan-400">
              {currencySymbol}
              {totalAmount.toLocaleString()}
            </span>

          </div>

        </div>

      )}

      {/* STATUS DROPDOWN STARTS HERE */}
      <select
  value={form.status}
  onChange={(e) =>
    setForm({
      ...form,
      status: e.target.value,
    })
  }
  className="
    w-full
    rounded-xl
    border
    border-white/20
    bg-white/10
    p-3
    text-white
    outline-none
    cursor-pointer
    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-400/30
  "
>
  <option
    value="Pending"
    className="bg-[#07111f]"
  >
    Pending
  </option>

  <option
    value="Completed"
    className="bg-[#07111f]"
  >
    Completed
  </option>

  <option
    value="Cancelled"
    className="bg-[#07111f]"
  >
    Cancelled
  </option>
</select>

<button
  type="submit"
  disabled={loading}
  className="
    w-full
    rounded-xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    py-3
    font-semibold
    text-white
    shadow-lg
    shadow-cyan-500/20
    transition
    hover:scale-[1.02]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading
    ? editOrder
      ? "Updating..."
      : "Saving..."
    : editOrder
    ? "Update Order"
    : "Save Order"}
</button>

    </form>

  </div>

</div>

)}

</div>

</DashboardLayout>

);

}