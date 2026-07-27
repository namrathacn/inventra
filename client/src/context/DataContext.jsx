import { createContext, useContext, useMemo, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      category: "Laptop",
      price: 120000,
      stock: 25
    },
    {
      id: 2,
      name: "Gaming Keyboard",
      category: "Accessories",
      price: 8500,
      stock: 8
    },
    {
      id: 3,
      name: "4K Monitor",
      category: "Display",
      price: 32000,
      stock: 14
    },
    {
      id: 4,
      name: "Wireless Mouse",
      category: "Accessories",
      price: 2500,
      stock: 35
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      product: "MacBook Pro",
      amount: 120000,
      status: "Completed"
    },
    {
      id: 2,
      customer: "Ananya Rao",
      product: "Gaming Keyboard",
      amount: 8500,
      status: "Pending"
    },
    {
      id: 3,
      customer: "Kiran Kumar",
      product: "4K Monitor",
      amount: 32000,
      status: "Completed"
    },
    {
      id: 4,
      customer: "Priya",
      product: "Wireless Mouse",
      amount: 2500,
      status: "Completed"
    }
  ]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.amount, 0);

    return {
      revenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      lowStock: products.filter((p) => p.stock < 10).length
    };
  }, [orders, products]);

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        orders,
        setOrders,
        stats
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}