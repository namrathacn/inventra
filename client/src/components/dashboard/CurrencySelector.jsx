import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { FiChevronDown } from "react-icons/fi";

import { useCurrency } from "../../context/CurrencyContext";



const currencies = [

  {
    name:"Indian Rupee",
    symbol:"₹",
    rate:1
  },


  {
    name:"US Dollar",
    symbol:"$",
    rate:0.012
  },


  {
    name:"Euro",
    symbol:"€",
    rate:0.011
  },


  {
    name:"British Pound",
    symbol:"£",
    rate:0.0095
  },


  {
    name:"Japanese Yen",
    symbol:"¥",
    rate:1.75
  }

];



export default function CurrencySelector(){


const [open,setOpen]=useState(false);


const {
currency,
setCurrency
}=useCurrency();



return (

<div className="relative">


<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-white/[0.06]
px-5
py-3
text-white
backdrop-blur-xl
"

>


<div className="
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-cyan-400/10
font-bold
text-cyan-300
">

{currency.symbol}

</div>



<div>

<p className="
text-sm
font-semibold
">

{currency.name}

</p>


<p className="
text-xs
text-slate-400
">

Currency

</p>


</div>


<FiChevronDown

className={`
transition
${open ? "rotate-180":""}
`}

/>


</motion.button>






<AnimatePresence>

{

open && (

<motion.div

initial={{
opacity:0,
y:10,
scale:.95
}}

animate={{
opacity:1,
y:0,
scale:1
}}

exit={{
opacity:0,
y:10,
scale:.95
}}

className="
absolute
right-0
top-16
z-50
w-60
rounded-3xl
border
border-white/10
bg-[#0F172A]/95
p-2
shadow-2xl
backdrop-blur-2xl
"

>


{

currencies.map((item)=>(


<motion.button


key={item.symbol}


whileHover={{
x:5
}}


onClick={()=>{

setCurrency(item);

setOpen(false);

}}


className="
flex
w-full
items-center
justify-between
rounded-2xl
px-4
py-3
text-sm
text-white
hover:bg-white/10
"

>


<span>

{item.name}

</span>


<span className="
font-bold
text-cyan-400
">

{item.symbol}

</span>


</motion.button>


))


}



</motion.div>

)

}


</AnimatePresence>



</div>

)

}