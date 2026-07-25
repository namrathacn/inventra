import {
  FiBell,
  FiSearch,
  FiChevronDown
} from "react-icons/fi";

import { useState } from "react";

import { motion } from "framer-motion";

import { useCurrency } from "../../context/CurrencyContext";

import { useSearch } from "../../context/SearchContext";



export default function Topbar(){



const {

currency,

setCurrency

}=useCurrency();




const {

search,

setSearch

}=useSearch();





const [open,setOpen]=useState(false);






const currencies=[


{
code:"INR",
symbol:"₹",
name:"Indian Rupee"
},


{
code:"USD",
symbol:"$",
name:"US Dollar"
},


{
code:"EUR",
symbol:"€",
name:"Euro"
},


{
code:"GBP",
symbol:"£",
name:"British Pound"
},


{
code:"JPY",
symbol:"¥",
name:"Japanese Yen"
}


];






const currentCurrency =

currencies.find(

item=>item.code===currency

);






return(



<header

className="
relative
z-50
h-20
px-6
flex
items-center
justify-between
border-b
border-white/10
bg-black/20
backdrop-blur-xl
"



>







{/* SEARCH */}



<div

className="
flex
items-center
gap-3
bg-white/5
border
border-white/10
rounded-xl
px-4
py-2
w-80
"



>


<FiSearch

className="
text-slate-400
"

/>



<input


value={search}


onChange={(e)=>setSearch(e.target.value)}



placeholder="Search products, orders..."



className="
bg-transparent
outline-none
text-white
placeholder:text-slate-500
w-full
"



/>


</div>









<div

className="
flex
items-center
gap-5
"

>









{/* CURRENCY */}



<div

className="
relative
z-[200]
"

>



<button


onClick={()=>setOpen(!open)}



className="
flex
items-center
gap-2
bg-white/5
border
border-white/10
rounded-xl
px-4
py-2
text-white
hover:bg-white/10
transition
"



>



<span>

{currentCurrency?.symbol}

</span>



<span>

{currency}

</span>



<FiChevronDown

className={

open

?

"rotate-180 transition"

:

"transition"

}

/>



</button>








{

open &&



<motion.div


initial={{

opacity:0,

y:-10

}}


animate={{

opacity:1,

y:0

}}


className="
absolute
right-0
top-14
w-52
rounded-2xl
bg-slate-900
border
border-white/10
shadow-2xl
overflow-hidden
z-[9999]
"



>


{


currencies.map(item=>(



<button


key={item.code}



onClick={()=>{


setCurrency(item.code);

setOpen(false);


}}




className="
w-full
flex
items-center
gap-3
px-5
py-3
text-white
hover:bg-white/10
transition
text-left
"



>



<span className="text-lg">

{item.symbol}

</span>



<div>

<p>

{item.code}

</p>


<p className="
text-xs
text-slate-400
">

{item.name}

</p>


</div>



</button>



))


}



</motion.div>


}



</div>










{/* NOTIFICATION */}



<button

className="
relative
text-white
hover:text-cyan-400
transition
"

>


<FiBell size={22}/>



<span

className="
absolute
right-0
top-0
h-2
w-2
rounded-full
bg-cyan-400
"

/>



</button>






</div>






</header>



)



}