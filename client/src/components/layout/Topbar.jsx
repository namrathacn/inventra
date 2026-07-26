import {
  FiSearch,
  FiBell,
  FiChevronDown
} from "react-icons/fi";

import { useState, useEffect, useRef } from "react";

import { useCurrency } from "../../context/CurrencyContext";
import { useSearch } from "../../context/SearchContext";



export default function Topbar(){


const {
currency,
setCurrency,
currencySymbol
}=useCurrency();



const {
search,
setSearch
}=useSearch();



const [currencyOpen,setCurrencyOpen]=useState(false);

const [bellOpen,setBellOpen]=useState(false);



const currencyRef=useRef(null);
const bellRef=useRef(null);





useEffect(()=>{


function close(e){


if(
currencyRef.current &&
!currencyRef.current.contains(e.target)
){

setCurrencyOpen(false);

}



if(
bellRef.current &&
!bellRef.current.contains(e.target)
){

setBellOpen(false);

}



}



document.addEventListener(
"mousedown",
close
);


return()=>{

document.removeEventListener(
"mousedown",
close
);

};


},[]);







const currencies=[

{
code:"INR",
symbol:"₹"
},

{
code:"USD",
symbol:"$"
},

{
code:"EUR",
symbol:"€"
},

{
code:"GBP",
symbol:"£"
},

{
code:"JPY",
symbol:"¥"
}

];






return(

<div className="
h-20
border-b
border-white/10
bg-[#070b18]/80
backdrop-blur-xl
flex
items-center
justify-between
px-8
sticky
top-0
z-40
">





{/* SEARCH */}



<div className="
relative
w-96
">


<FiSearch

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"

/>



<input


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


placeholder="
Search products, orders...
"


className="
w-full
rounded-2xl
bg-white/5
border
border-white/10
py-3
pl-12
pr-4
text-white
placeholder:text-slate-500
outline-none
focus:border-cyan-400
transition
"


/>



</div>










<div className="
flex
items-center
gap-5
">







{/* CURRENCY */}



<div

ref={currencyRef}

className="
relative
"


>


<button

onClick={()=>setCurrencyOpen(!currencyOpen)}

className="
flex
items-center
gap-2
rounded-xl
bg-white/5
border
border-white/10
px-5
py-3
text-white
hover:bg-white/10
transition
"

>


{currencySymbol}

{currency}


<FiChevronDown/>

</button>





{

currencyOpen &&

<div className="
absolute
right-0
mt-3
w-40
rounded-2xl
border
border-white/10
bg-[#111827]
shadow-2xl
overflow-hidden
z-50
">


{

currencies.map((item)=>(


<button

key={item.code}

onClick={()=>{

setCurrency(item.code);

setCurrencyOpen(false);

}}


className="
w-full
flex
gap-3
px-5
py-3
text-slate-200
hover:bg-cyan-500/20
transition
"


>


<span>

{item.symbol}

</span>


<span>

{item.code}

</span>


</button>



))


}



</div>


}



</div>









{/* BELL */}



<div

ref={bellRef}

className="
relative
"


>


<button

onClick={()=>setBellOpen(!bellOpen)}

className="
relative
rounded-xl
bg-white/5
border
border-white/10
p-3
text-white
hover:bg-white/10
transition
"


>


<FiBell className="
text-xl
"/>


<span className="
absolute
right-2
top-2
h-2
w-2
rounded-full
bg-cyan-400
"/>


</button>





{

bellOpen &&


<div className="
absolute
right-0
mt-3
w-72
rounded-2xl
border
border-white/10
bg-[#111827]
p-5
shadow-2xl
z-50
">


<h3 className="
font-bold
text-white
">

Notifications

</h3>


<p className="
text-sm
text-slate-400
mt-3
">

No new notifications

</p>


</div>


}





</div>





</div>




</div>


);


}