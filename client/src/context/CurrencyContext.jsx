import { createContext, useContext, useState } from "react";


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


    if (!amount) return "0.00";


    const value =
      Number(amount) *
      currencyData[currency].rate;



    return value.toFixed(2);


  }







  return (

    <CurrencyContext.Provider


      value={{

        currency,

        setCurrency,


        currencySymbol:
          currencyData[currency].symbol,


        convertAmount


      }}


    >


      {children}


    </CurrencyContext.Provider>


  );


}







export function useCurrency(){


  return useContext(CurrencyContext);


}