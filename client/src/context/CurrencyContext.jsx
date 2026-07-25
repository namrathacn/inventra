import { createContext, useContext, useState } from "react";


const CurrencyContext = createContext();



export function CurrencyProvider({children}){


const [currency,setCurrency]=useState({

name:"Indian Rupee",

symbol:"₹",

rate:1

});



const formatMoney=(amount)=>{

return `${currency.symbol}${Math.round(amount * currency.rate).toLocaleString()}`;

};



return(

<CurrencyContext.Provider

value={{
currency,
setCurrency,
formatMoney
}}

>

{children}

</CurrencyContext.Provider>


);


}



export function useCurrency(){

return useContext(CurrencyContext);

}