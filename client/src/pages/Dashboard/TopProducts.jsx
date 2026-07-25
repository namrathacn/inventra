import {
FiStar,
FiTrendingUp
} from "react-icons/fi";

import {
motion
} from "framer-motion";


export default function TopProducts(){


const products=[


{
name:"MacBook Pro",
category:"Laptop",
sales:"120 units sold",
revenue:"₹8,40,000",
growth:"+24%"
},


{
name:"Gaming Accessories",
category:"Accessories",
sales:"98 units sold",
revenue:"₹2,25,000",
growth:"+18%"
},


{
name:"4K Monitor",
category:"Display",
sales:"76 units sold",
revenue:"₹3,20,000",
growth:"+12%"
},


{
name:"Wireless Devices",
category:"Electronics",
sales:"54 units sold",
revenue:"₹1,40,000",
growth:"+9%"
}



];




return(


<motion.div


initial={{
opacity:0,
x:30
}}


animate={{
opacity:1,
x:0
}}


transition={{
duration:.5
}}


className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
shadow-xl
"


>



<div className="
flex
items-center
justify-between
">


<div>


<h2 className="
text-xl
font-bold
text-white
">

Top Products

</h2>


<p className="
text-sm
text-slate-400
mt-1
">

Best selling products

</p>


</div>




<div className="
rounded-2xl
bg-yellow-500/20
p-3
">


<FiStar

className="
text-2xl
text-yellow-400
"

/>


</div>


</div>







<div className="
mt-6
space-y-4
">


{

products.map((product,index)=>(


<motion.div


whileHover={{
scale:1.03
}}


key={product.name}


className="
rounded-2xl
border
border-white/10
bg-white/5
p-4
transition
"



>


<div className="
flex
justify-between
items-center
">


<div>


<h3 className="
font-semibold
text-white
">

#{index+1} {product.name}

</h3>


<p className="
text-sm
text-slate-400
">

{product.category}

</p>


</div>





<div className="
text-right
">


<h4 className="
font-bold
text-cyan-400
">

{product.revenue}

</h4>



<p className="
flex
items-center
justify-end
gap-1
text-sm
text-green-400
">

<FiTrendingUp/>

{product.growth}

</p>



</div>



</div>







<div className="
mt-4
flex
justify-between
text-sm
text-slate-400
">


<span>

Sales

</span>


<span>

{product.sales}

</span>


</div>




</motion.div>


))


}



</div>






</motion.div>


)

}