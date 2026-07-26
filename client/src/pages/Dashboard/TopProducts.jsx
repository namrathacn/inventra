import { FiBox, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSearch } from "../../context/SearchContext";


export default function TopProducts(){


const {
search
}=useSearch();



const products=[

{
name:"MacBook Pro",
category:"Laptop",
sales:120,
amount:"₹1,20,000"
},

{
name:"Gaming Keyboard",
category:"Accessories",
sales:85,
amount:"₹8,500"
},

{
name:"4K Monitor",
category:"Display",
sales:70,
amount:"₹32,000"
},

{
name:"Wireless Mouse",
category:"Accessories",
sales:54,
amount:"₹2,500"
}

];




const filteredProducts = products.filter((item)=>

item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);




return(

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
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
">

Best selling items

</p>


</div>



<FiTrendingUp className="
text-cyan-400
text-2xl
"/>


</div>





<div className="
mt-6
space-y-4
">


{

filteredProducts.length>0 ?


filteredProducts.map((product,index)=>(


<div

key={product.name}

className="
flex
items-center
justify-between
rounded-2xl
bg-white/5
p-4
hover:bg-white/10
transition
"

>


<div className="
flex
items-center
gap-4
">


<div className="
rounded-xl
bg-purple-500/20
p-3
">

<FiBox className="
text-purple-400
text-xl
"/>

</div>




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


</div>





<div className="
text-right
">


<p className="
font-bold
text-cyan-400
">

{product.amount}

</p>


<p className="
text-sm
text-green-400
">

↗ +9%

</p>



</div>




</div>


))


:

<div className="
text-center
text-slate-400
py-6
">

No products found

</div>



}



</div>



</motion.div>


);


}