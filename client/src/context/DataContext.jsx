import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../firebase";

import api from "../services/api";


const DataContext = createContext();



export function DataProvider({ children }) {


  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);



  const loadProducts = async () => {

    try {

      const res = await api.get("/products");


      setProducts(
        res.data.data || []
      );


    } catch (err) {

      console.error(
        "Products Error:",
        err
      );

      setProducts([]);

    }

  };




  const loadOrders = async () => {

    try {

      const res = await api.get("/orders");


      setOrders(
        res.data.data || []
      );


    } catch (err) {

      console.error(
        "Orders Error:",
        err
      );


      setOrders([]);

    }

  };





  const loadData = async () => {

    try {


      setLoading(true);


      await Promise.all([

        loadProducts(),

        loadOrders(),

      ]);



    } catch (err) {

      console.error(
        "Data Loading Error:",
        err
      );


    } finally {


      setLoading(false);


    }

  };






  useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (user) => {

      if (!user) {
        setProducts([]);
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        await user.getIdToken(true);
        await loadData();
      } catch (err) {
        console.error(err);
      }

    }
  );

  return unsubscribe;

}, []);







  const stats = useMemo(() => {


    const revenue = orders.reduce(

      (sum, order) =>

        sum +

        Number(
          order.amount ||
          order.total ||
          0
        ),

      0

    );



    return {


      revenue,


      totalOrders:
        orders.length,


      totalProducts:
        products.length,


      lowStock:

        products.filter(

          (p) =>

          Number(p.stock) < 10

        ).length,


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