import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPackage,
  FiBarChart,
  FiAlertTriangle
} from "react-icons/fi";


import {
  motion
} from "framer-motion";


import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";



export default function Reports(){



const {

currencySymbol,

convertAmount

}=useCurrency();





const monthlySales=[

{
month:"Jan",
value:60
},

{
month:"Feb",
value:75
},

{
month:"Mar",
value:55
},

{
month:"Apr",
value:90
},

{
month:"May",
value:80
},

{
month:"Jun",
value:95
}

];







return(


<DashboardLayout>


<div className="
space-y-8
">







{/* HEADER */}



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
backdrop-blur-xl
p-8
"


>


<h1 className="
text-3xl
font-bold
text-white
">

Reports & Analytics

</h1>



<p className="
text-slate-400
mt-2
">

Business performance overview

</p>



</motion.div>









{/* SUMMARY CARDS */}



<div className="
grid
gap-6
md:grid-cols-4
">





<Card

title="Total Revenue"

value={`${currencySymbol}${convertAmount(1520000)}`}

icon={<FiDollarSign/>}

color="text-cyan-400"

/>





<Card

title="Total Profit"

value={`${currencySymbol}${convertAmount(482000)}`}

icon={<FiTrendingUp/>}

color="text-green-400"

/>





<Card

title="Loss"

value={`${currencySymbol}${convertAmount(38500)}`}

icon={<FiTrendingDown/>}

color="text-red-400"

/>





<Card

title="Inventory"

value="421"

icon={<FiPackage/>}

color="text-purple-400"

/>





</div>









{/* SALES GRAPH */}



<motion.div


className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
"


>


<h2 className="
text-xl
font-bold
text-white
">

Monthly Sales Growth

</h2>



<p className="
text-sm
text-slate-400
mt-1
">

Revenue performance over months

</p>






<div className="
mt-8
h-64
flex
items-end
gap-5
p-5
rounded-2xl
bg-black/10
">



{

monthlySales.map((item,index)=>(


<div

key={item.month}

className="
flex-1
h-full
flex
flex-col
items-center
justify-end
gap-3
"


>


<motion.div


initial={{
height:0
}}


animate={{
height:`${item.value}%`
}}


transition={{
duration:.8,
delay:index*0.1
}}



className="
w-full
rounded-t-xl
bg-gradient-to-t
from-blue-600
to-cyan-400
"


/>



<span className="
text-xs
text-slate-400
">

{item.month}

</span>



</div>


))


}



</div>




</motion.div>









{/* PROFIT LOSS */}




<div className="
grid
gap-6
md:grid-cols-2
">






<div className="
rounded-3xl
border
border-green-400/20
bg-green-500/10
p-6
">



<div className="
flex
items-center
gap-3
">


<FiTrendingUp className="
text-green-400
text-3xl
"/>


<h2 className="
text-xl
font-bold
text-white
">

Profit Analysis

</h2>


</div>





<p className="
text-4xl
font-bold
text-white
mt-5
">

{currencySymbol}{convertAmount(482000)}

</p>





<p className="
text-green-400
mt-2
">

+12% compared to last month

</p>




</div>









<div className="
rounded-3xl
border
border-red-400/20
bg-red-500/10
p-6
">



<div className="
flex
items-center
gap-3
">


<FiTrendingDown className="
text-red-400
text-3xl
"/>



<h2 className="
text-xl
font-bold
text-white
">

Loss Analysis

</h2>



</div>





<p className="
text-4xl
font-bold
text-white
mt-5
">

{currencySymbol}{convertAmount(38500)}

</p>





<p className="
text-red-400
mt-2
">

Slow moving products detected

</p>





</div>






</div>









{/* INVENTORY REPORT */}





<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
">



<h2 className="
text-xl
font-bold
text-white
">

Inventory Report

</h2>






<div className="
grid
md:grid-cols-3
gap-5
mt-6
">






<div className="
rounded-2xl
bg-white/5
p-5
">



<FiPackage className="
text-cyan-400
text-3xl
"/>



<h3 className="
text-white
font-semibold
mt-4
">

Available Stock

</h3>



<p className="
text-3xl
font-bold
text-white
mt-2
">

350

</p>



</div>








<div className="
rounded-2xl
bg-white/5
p-5
">



<FiAlertTriangle className="
text-yellow-400
text-3xl
"/>



<h3 className="
text-white
font-semibold
mt-4
">

Low Stock

</h3>



<p className="
text-3xl
font-bold
text-white
mt-2
">

14

</p>



</div>









<div className="
rounded-2xl
bg-white/5
p-5
">



<FiBarChart className="
text-purple-400
text-3xl
"/>



<h3 className="
text-white
font-semibold
mt-4
">

Growth Rate

</h3>



<p className="
text-3xl
font-bold
text-white
mt-2
">

18%

</p>



</div>







</div>



</div>








</div>


</DashboardLayout>


)


}









function Card({title,value,icon,color}){


return(


<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
">


<div className={`${color} text-3xl`}>

{icon}

</div>



<p className="
text-slate-400
mt-4
">

{title}

</p>



<h2 className="
text-3xl
font-bold
text-white
mt-2
">

{value}

</h2>



</div>


)


}