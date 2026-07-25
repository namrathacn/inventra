import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";


export default function TopProducts(){


const { formatMoney } = useCurrency();



const products=[

{
name:"MacBook Pro",
sales:92,
revenue:420000
},

{
name:"iPhone 15",
sales:78,
revenue:310000
},

{
name:"Gaming Keyboard",
sales:64,
revenue:85000
},

{
name:"Wireless Headset",
sales:52,
revenue:62000
}

];



return(


<motion.div

initial={{
opacity:0,
scale:0.95
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:0.6
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
mb-8
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

Top Selling Products

</h2>



<span className="
rounded-full
bg-cyan-400/10
px-4
py-2
text-xs
font-semibold
text-cyan-300
">

Monthly

</span>


</div>





<div className="space-y-7">


{

products.map((item,index)=>(


<motion.div

key={item.name}

whileHover={{
scale:1.03
}}

transition={{
duration:0.2
}}

>



<div className="
mb-3
flex
items-center
justify-between
">


<div>


<p className="
font-semibold
text-white
">

#{index+1} {item.name}

</p>


<p className="
mt-1
text-sm
text-slate-400
">

{formatMoney(item.revenue)}

</p>


</div>




<p className="
font-bold
text-cyan-400
">

{item.sales}%

</p>



</div>





<div className="
h-3
overflow-hidden
rounded-full
bg-white/10
">


<motion.div


initial={{
width:0
}}


animate={{
width:`${item.sales}%`
}}


transition={{
duration:1
}}


className="
h-full
rounded-full
bg-gradient-to-r
from-cyan-400
to-blue-500
"

/>


</div>



</motion.div>


))


}



</div>



</motion.div>


)

}