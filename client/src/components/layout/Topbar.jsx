import { motion } from "framer-motion";

import {
  FiBell,
  FiSearch,
} from "react-icons/fi";

import CurrencySelector from "../dashboard/CurrencySelector";



export default function Topbar() {


return (


<motion.header

initial={{
y:-30,
opacity:0
}}

animate={{
y:0,
opacity:1
}}

transition={{
duration:.6
}}


className="

sticky
top-4
z-30
mx-4
flex
items-center
justify-between
rounded-[28px]
border
border-white/10
bg-white/[0.06]
px-7
py-5
backdrop-blur-2xl
shadow-xl

"

>



<div>


<p className="
text-xs
uppercase
tracking-[0.3em]
text-slate-500
">

Overview

</p>


<h2 className="
mt-1
font-display
text-2xl
font-bold
text-white
">

Dashboard

</h2>


</div>







<div className="flex items-center gap-5">





<CurrencySelector />






<div className="relative">


<FiSearch

className="
absolute
left-4
top-3.5
text-slate-400
"

/>



<input

placeholder="Search anything..."

className="

w-80
rounded-2xl
border
border-white/10
bg-black/20
py-3
pl-11
pr-5
text-sm
text-white
outline-none
placeholder:text-slate-500
transition
focus:border-cyan-400/50

"

/>


</div>







<motion.button


whileHover={{
scale:1.1
}}

whileTap={{
scale:.9
}}


className="

relative
rounded-2xl
border
border-white/10
bg-white/5
p-3
text-white

"

>


<FiBell size={21}/>


<motion.span

animate={{
scale:[1,1.4,1]
}}

transition={{
duration:2,
repeat:Infinity
}}


className="

absolute
right-2
top-2
h-2.5
w-2.5
rounded-full
bg-cyan-400

"

/>


</motion.button>








<motion.div

whileHover={{
scale:1.05
}}


className="

flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
px-4
py-2

"

>


<img

src="https://ui-avatars.com/api/?background=38bdf8&color=fff&name=Namratha"

className="
h-11
w-11
rounded-xl
"

/>



<div>

<h3 className="
font-semibold
text-white
">

Namratha

</h3>


<p className="
text-xs
text-slate-400
">

Administrator

</p>


</div>



</motion.div>





</div>



</motion.header>


);

}