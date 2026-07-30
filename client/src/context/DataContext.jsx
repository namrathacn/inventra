import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../services/api";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Products Error:", err);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Orders Error:", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await Promise.all([
        loadProducts(),
        loadOrders(),
      ]);

      setLoading(false);
    }

    loadData();
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.amount || 0),
      0
    );

    return {
      revenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      lowStock: products.filter((p) => Number(p.stock) < 10).length,
    };
  }, [orders, products]);

  return (
    <DataContext.Provider
      value={{
        loading,

        products,
        setProducts,
        loadProducts,

        orders,
        setOrders,
        loadOrders,

        stats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}