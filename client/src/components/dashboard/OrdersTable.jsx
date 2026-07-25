import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";


export default function OrdersTable(){


const { formatMoney } = useCurrency();



const orders=[


{
id:"#1024",
name:"MacBook Pro",
customer:"Rahul",
amount:125000,
status:"Completed"
},


{
id:"#1025",
name:"iPhone 15",
customer:"Ananya",
amount:78000,
status:"Pending"
},


{
id:"#1026",
name:"Gaming Keyboard",
customer:"Arjun",
amount:8500,
status:"Delivered"
},


{
id:"#1027",
name:"Monitor",
customer:"Kiran",
amount:22000,
status:"Processing"
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


<h2 className="
mb-6
font-display
text-2xl
font-bold
text-white
">

Recent Orders

</h2>




<div className="space-y-4">


{

orders.map((order)=>(


<motion.div


key={order.id}


whileHover={{
scale:1.02,
x:5
}}


className="
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-white/[0.04]
p-5
"


>



<div>


<p className="
font-semibold
text-white
">

{order.name}

</p>


<p className="
text-sm
text-slate-400
">

{order.customer}

</p>


</div>




<div className="text-right">


<p className="
font-bold
text-white
">

{formatMoney(order.amount)}

</p>


<p className="
text-xs
text-slate-500
">

{order.id}

</p>


</div>





<span className="

rounded-full
bg-cyan-400/10
px-4
py-2
text-xs
font-semibold
text-cyan-300

">


{order.status}


</span>



</motion.div>


))


}



</div>



</motion.div>


)

}