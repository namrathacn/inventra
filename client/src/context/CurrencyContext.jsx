import { createContext, useContext, useMemo, useState } from "react";


const CurrencyContext = createContext();



export function CurrencyProvider({ children }) {


  const [currency, setCurrency] = useState("INR");



  const currencyData = {

    INR: {
      symbol: "₹",
      rate: 1
    },

    USD: {
      symbol: "$",
      rate: 0.012
    },

    EUR: {
      symbol: "€",
      rate: 0.011
    },

    GBP: {
      symbol: "£",
      rate: 0.0095
    },

    JPY: {
      symbol: "¥",
      rate: 1.8
    }

  };




  function convertAmount(amount) {

    return Number(amount || 0) * currencyData[currency].rate;

  }





  function formatCurrency(amount) {


    return (

      currencyData[currency].symbol +

      Math.round(convertAmount(amount))
        .toLocaleString("en-IN")

    );


  }






  const value = useMemo(

    () => ({

      currency,

      setCurrency,

      currencySymbol: currencyData[currency].symbol,

      convertAmount,

      formatCurrency,

      formatMoney: formatCurrency

    }),

    [currency]

  );




  return (

    <CurrencyContext.Provider value={value}>

      {children}

    </CurrencyContext.Provider>

  );

}




export function useCurrency(){

  return useContext(CurrencyContext);

}