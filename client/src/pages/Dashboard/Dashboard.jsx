import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FiDollarSign,
  FiBox,
  FiShoppingCart,
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
  FiTrendingUp
} from "react-icons/fi";

import { motion } from "framer-motion";

import StatCard from "../../components/cards/StatCard";
import RevenueChart from "../../components/charts/RevenueChart";

import SalesTrend from "./SalesTrend";
import TopProducts from "./TopProducts";

import { useCurrency } from "../../context/CurrencyContext";
import { useData } from "../../context/DataContext";
import { useSearch } from "../../context/SearchContext";


export default function Dashboard() {


const {
  formatCurrency
} = useCurrency();


const {
  search
} = useSearch();
const {
  orders,
  products,
  stats
} = useData();




const filteredOrders = orders
.filter((order)=>
(order.product || "")
.toLowerCase()
.includes(search.toLowerCase())
)
.slice(0,5);


const availableStock = products.filter(
p => Number(p.stock) > 5
).length;

const lowStock = products.filter(
p => Number(p.stock) > 0 &&
Number(p.stock) <= 5
).length;

const outOfStock = products.filter(
p => Number(p.stock) === 0
).length;


const totalRevenue = orders.reduce(
(sum,o)=>sum + Number(o.amount || 0),
0
);


const totalCost = products.reduce(
(sum,p)=>
sum + (Number(p.price || 0) * Number(p.stock || 0)),
0
);


const profit =
Math.max(
totalRevenue - totalCost,
0
);

const loss =
Math.max(
totalCost - totalRevenue,
0
);


const deadStock =
products.filter(
p=>Number(p.stock)>0
).length;


const demandForecast =
orders.length===0
?0
:Math.min(
Math.round(
orders.length*8
),
100
);





return (

<DashboardLayout>


<div className="space-y-8">



{/* STAT CARDS */}


<div
className="
grid
gap-6
lg:grid-cols-4
"
>



<StatCard

title="Revenue"

value={stats.revenue}

isCurrency={true}

icon={<FiDollarSign/>}

glowColor="bg-emerald-500"

iconBackground="bg-emerald-500/20"

iconColor="text-emerald-400"

/>



<StatCard

title="Orders"

value={stats.totalOrders}

icon={<FiShoppingCart/>}

glowColor="bg-blue-500"

iconBackground="bg-blue-500/20"

iconColor="text-blue-400"

/>



<StatCard

title="Products"

value={stats.totalProducts}

icon={<FiBox/>}

glowColor="bg-purple-500"

iconBackground="bg-purple-500/20"

iconColor="text-purple-400"

/>



<StatCard

title="Low Stock"

value={stats.lowStock}

icon={<FiAlertTriangle/>}

glowColor="bg-red-500"

iconBackground="bg-red-500/20"

iconColor="text-red-400"

/>


</div>





<RevenueChart />






<div
className="
grid
gap-6
lg:grid-cols-2
"
>



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


<h2 className="
text-xl
font-bold
text-white
">

Sales Overview

</h2>



<p className="
text-sm
text-slate-400
mt-1
">

Monthly performance

</p>




<div className="
mt-6
space-y-5
">


{

[
["January",75],
["February",60],
["March",85],
["April",70]

].map((item)=>(


<div key={item[0]}>


<div className="
flex
justify-between
text-sm
text-slate-300
">


<span>
{item[0]}
</span>


<span>
{item[1]}%
</span>


</div>



<div className="
h-3
rounded-full
bg-white/10
mt-2
">



<div

className="
h-full
rounded-full
bg-gradient-to-r
from-blue-500
to-cyan-400
"

style={{
width:`${item[1]}%`
}}

/>



</div>



</div>


))


}



</div>



</motion.div>





<motion.div

className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
"

>


<h2 className="
text-xl
font-bold
text-white
">

Inventory Status

</h2>


<p className="
text-sm
text-slate-400
mt-1
">

Current stock overview

</p>




<div className="
grid
grid-cols-3
gap-4
mt-8
">



<div className="
rounded-2xl
bg-green-500/10
p-5
text-center
">


<FiBox

className="
mx-auto
text-3xl
text-green-400
"

/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

{availableStock}

</h3>


<p className="
text-sm
text-slate-400
">

Available

</p>


</div>
<div className="
rounded-2xl
bg-yellow-500/10
p-5
text-center
">


<FiAlertTriangle

className="
mx-auto
text-3xl
text-yellow-400
"

/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

{lowStock}

</h3>


<p className="
text-sm
text-slate-400
">

Low

</p>


</div>





<div className="
rounded-2xl
bg-red-500/10
p-5
text-center
">


<FiBox

className="
mx-auto
text-3xl
text-red-400
"

/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

{outOfStock}

</h3>


<p className="
text-sm
text-slate-400
">

Out

</p>


</div>



</div>



</motion.div>


</div>





{/* SALES TREND + TOP PRODUCTS */}


<div className="
grid
gap-6
lg:grid-cols-2
">


<SalesTrend />


<TopProducts />


</div>







{/* RECENT ORDERS */}


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

Recent Orders

</h2>


<p className="
text-sm
text-slate-400
mt-1
">

Latest customer transactions

</p>


</div>




<button

className="
text-cyan-400
text-sm
hover:text-cyan-300
"

>

View all

</button>



</div>







<div className="
mt-6
space-y-4
">


{

filteredOrders.length > 0 ?


filteredOrders.map((order)=>(


<div

key={order.id}

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


<div>


<h3 className="
font-semibold
text-white
">

{order.product}

</h3>



<p className="
text-sm
text-slate-400
">

{order.id}

{" • "}

{formatCurrency(order.amount)}

</p>


</div>






<div className="
flex
items-center
gap-2
">


{

order.status === "Completed"

?

<FiCheckCircle

className="
text-green-400
text-xl
"

/>

:

<FiClock

className="
text-yellow-400
text-xl
"

/>

}



<span className="
text-slate-300
">

{order.status}

</span>


</div>




</div>


))


:


<div className="
text-center
text-slate-400
py-8
">

No orders found

</div>


}



</div>



</motion.div>
{/* AI INVENTORY INSIGHTS */}


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
border-purple-400/20
bg-gradient-to-br
from-purple-500/10
to-blue-500/10
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

AI Inventory Insights

</h2>



<p className="
text-sm
text-slate-400
mt-1
">

Smart business analysis and predictions

</p>


</div>




<div className="
rounded-2xl
bg-purple-500/20
p-3
">


<FiTrendingUp

className="
text-purple-400
text-2xl
"

/>


</div>


</div>







<div className="
grid
gap-5
mt-6
md:grid-cols-4
">






<div className="
rounded-2xl
border
border-green-400/20
bg-green-500/10
p-5
">


<h3 className="
font-semibold
text-green-400
">

Profit Analysis

</h3>




<h4 className="
text-3xl
font-bold
text-white
mt-3
">

{formatCurrency(profit)}

</h4>




<p className="
text-sm
text-slate-300
mt-2
">

{
orders.length===0
?
"No sales yet"
:
`${orders.length} Orders`
}

</p>



</div>









<div className="
rounded-2xl
border
border-red-400/20
bg-red-500/10
p-5
">


<h3 className="
font-semibold
text-red-400
">

Loss Detection

</h3>





<h4 className="
text-3xl
font-bold
text-white
mt-3
">

{formatCurrency(loss)}

</h4>




<p className="
text-sm
text-slate-300
mt-2
">

No active losses detected

</p>



</div>









<div className="
rounded-2xl
border
border-yellow-400/20
bg-yellow-500/10
p-5
">


<h3 className="
font-semibold
text-yellow-400
">

Dead Stock Alert

</h3>




<h4 className="
text-3xl
font-bold
text-white
mt-3
">

{deadStock}

</h4>




<p className="
text-sm
text-slate-300
mt-2
">

Products currently in stock

</p>



</div>









<div className="
rounded-2xl
border
border-cyan-400/20
bg-cyan-500/10
p-5
">


<h3 className="
font-semibold
text-cyan-400
">

Demand Forecast

</h3>





<h4 className="
text-3xl
font-bold
text-white
mt-3
">

{demandForecast}%

</h4>




<p className="
text-sm
text-slate-300
mt-2
">

{
orders.length===0
?
"No prediction yet"
:
"Based on current orders"
}

</p>



</div>





</div>




</motion.div>





</div>


</DashboardLayout>


);

}