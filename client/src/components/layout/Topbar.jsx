import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiPackage,
  FiShoppingCart,
  FiGrid,
  FiFileText,
  FiUsers,
  FiSettings
} from "react-icons/fi";


import {
  useState,
  useEffect,
  useRef
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  motion,
  AnimatePresence
} from "framer-motion";


import {
  useCurrency
} from "../../context/CurrencyContext";


import {
  useSearch
} from "../../context/SearchContext";






export default function Topbar(){



const navigate = useNavigate();





const {

currency,

setCurrency,

currencySymbol

}=useCurrency();






const {

search,

setSearch,

results

}=useSearch();






const [currencyOpen,setCurrencyOpen]=useState(false);

const [bellOpen,setBellOpen]=useState(false);

const [searchOpen,setSearchOpen]=useState(false);






const currencyRef=useRef(null);

const bellRef=useRef(null);

const searchRef=useRef(null);







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




if(
searchRef.current &&
!searchRef.current.contains(e.target)
){

setSearchOpen(false);

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









const getIcon=(type)=>{


if(type==="Product")
return <FiPackage/>;


if(type==="Order")
return <FiShoppingCart/>;


if(type==="Page")
return <FiGrid/>;


return <FiFileText/>;


};









return(


<div

className="
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
"


>








{/* SEARCH */}



<div

ref={searchRef}

className="
relative
w-[420px]
"


>



<div className="
relative
">


<FiSearch

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
text-lg
"

/>





<input


value={search}



onFocus={()=>setSearchOpen(true)}



onChange={(e)=>{


setSearch(e.target.value);

setSearchOpen(true);


}}



placeholder="Search products, orders, pages..."



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
focus:ring-2
focus:ring-cyan-400/20
transition
"


/>


</div>







<AnimatePresence>



{

searchOpen && search && (


<motion.div


initial={{

opacity:0,

y:15,

scale:0.95

}}


animate={{

opacity:1,

y:0,

scale:1

}}



exit={{

opacity:0,

y:15,

scale:0.95

}}



className="
absolute
top-14
left-0
w-full
rounded-3xl
bg-[#0b1220]/95
border
border-white/10
backdrop-blur-2xl
shadow-2xl
shadow-cyan-500/20
overflow-hidden
z-50
"


>




{


results.length>0 ?



results.map((item,index)=>(



<motion.button


key={index}



initial={{

opacity:0,

x:-20

}}



animate={{

opacity:1,

x:0

}}



transition={{

delay:index*0.05

}}



onClick={()=>{


navigate(item.path);


setSearch("");

setSearchOpen(false);


}}



className="
w-full
flex
items-center
gap-4
px-5
py-4
text-left
hover:bg-cyan-500/10
transition
"


>



<div className="
h-10
w-10
rounded-xl
bg-cyan-500/20
text-cyan-300
flex
items-center
justify-center
">

{getIcon(item.type)}

</div>




<div>


<h3 className="
text-white
font-semibold
">

{item.name}

</h3>



<p className="
text-xs
text-slate-400
">

{item.type}

</p>



</div>



</motion.button>



))


:



<div className="
p-6
text-center
text-slate-400
">

No results found

</div>



}




</motion.div>



)

}


</AnimatePresence>





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







<AnimatePresence>

{

currencyOpen &&



<motion.div


initial={{
opacity:0,
y:-10
}}


animate={{
opacity:1,
y:0
}}


exit={{
opacity:0,
y:-10
}}



className="
absolute
right-0
mt-3
w-40
rounded-2xl
bg-[#111827]
border
border-white/10
shadow-2xl
overflow-hidden
z-50
"


>


{


currencies.map(item=>(


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



</motion.div>



}



</AnimatePresence>




</div>









{/* NOTIFICATION */}



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


<FiBell className="text-xl"/>



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








<AnimatePresence>


{

bellOpen &&



<motion.div


initial={{
opacity:0,
y:-10
}}


animate={{
opacity:1,
y:0
}}



exit={{
opacity:0,
y:-10
}}



className="
absolute
right-0
mt-3
w-72
rounded-2xl
bg-[#111827]
border
border-white/10
p-5
shadow-2xl
z-50
"


>


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



</motion.div>


}


</AnimatePresence>



</div>







</div>







</div>


);


}