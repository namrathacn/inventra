import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";


export default function LowStock(){


const products=[

{
name:"Wireless Mouse",
stock:3,
color:"#F59E0B"
},

{
name:"Mechanical Keyboard",
stock:5,
color:"#EF4444"
},

{
name:"USB Cable",
stock:2,
color:"#F97316"
},

{
name:"Headphones",
stock:1,
color:"#DC2626"
}

];



return(


<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="
rounded-[32px]
border
border-white/10
bg-white/[0.06]
p-7
backdrop-blur-2xl
shadow-xl
"


>


<div className="
mb-7
flex
items-center
justify-between
">


<h2 className="
font-display
text-2xl
font-bold
text-white
">

Low Stock

</h2>



<div className="
rounded-2xl
bg-red-500/10
p-3
text-red-400
">

<FiAlertTriangle size={22}/>

</div>


</div>





<div className="space-y-5">


{

products.map((item,index)=>(


<motion.div

key={item.name}

whileHover={{
scale:1.03,
x:5
}}

transition={{
type:"spring",
stiffness:200
}}

className="
rounded-2xl
border
border-white/10
bg-white/[0.04]
p-5
"


>


<div className="flex justify-between">


<div>

<p className="
font-semibold
text-white
">

{item.name}

</p>


<p className="
mt-1
text-sm
text-slate-400
">

Inventory remaining

</p>


</div>




<div className="
text-right
">


<p
className="
text-xl
font-bold
"
style={{
color:item.color
}}
>

{item.stock}

</p>


<p className="
text-xs
text-slate-400
">

units

</p>


</div>



</div>





<div className="
mt-4
h-2
rounded-full
bg-white/10
overflow-hidden
">


<motion.div

initial={{
width:0
}}

animate={{
width:`${item.stock*15}%`
}}

transition={{
duration:1
}}

className="
h-full
rounded-full
"

style={{
background:item.color
}}


/>


</div>



</motion.div>


))

}



</div>



</motion.div>


)

}