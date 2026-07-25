import DashboardLayout from "../../layouts/DashboardLayout";

import {
FiDollarSign,
FiPackage,
FiShoppingCart,
FiAlertTriangle,
FiBox,
FiClock,
FiCheckCircle,
FiTrendingUp
} from "react-icons/fi";


import {
motion
} from "framer-motion";


import StatCard from "../../components/cards/StatCard";

import RevenueChart from "../../components/charts/RevenueChart";


import SalesTrend from "./SalesTrend";

import TopProducts from "./TopProducts";


import {
useCurrency
} from "../../context/CurrencyContext";




export default function Dashboard(){



const {
formatCurrency
}=useCurrency();





const orders=[

{
id:"#1024",
product:"MacBook Pro",
price:"₹1,20,000",
status:"Completed"
},

{
id:"#1025",
product:"Gaming Keyboard",
price:"₹8,500",
status:"Pending"
},

{
id:"#1026",
product:"4K Monitor",
price:"₹32,000",
status:"Completed"
},

{
id:"#1027",
product:"Wireless Mouse",
price:"₹2,500",
status:"Completed"
}

];





return(


<DashboardLayout>


<div className="space-y-8">





{/* STAT CARDS */}


<div className="
grid
gap-6
lg:grid-cols-4
">



<StatCard

title="Revenue"

value={1528860}

format={formatCurrency}

change="+18.4%"

color="#3B82F6"

icon={<FiDollarSign/>}

/>





<StatCard

title="Orders"

value={267}

change="+7.2%"

color="#06B6D4"

icon={<FiShoppingCart/>}

/>





<StatCard

title="Products"

value={421}

change="+3.8%"

color="#10B981"

icon={<FiPackage/>}

/>





<StatCard

title="Low Stock"

value={14}

change="-5 today"

color="#F59E0B"

icon={<FiAlertTriangle/>}

/>



</div>









{/* REVENUE CHART */}



<RevenueChart/>









{/* SALES OVERVIEW + INVENTORY */}



<div className="
grid
gap-6
lg:grid-cols-2
">





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









{/* INVENTORY */}



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


<FiBox className="
mx-auto
text-3xl
text-green-400
"/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

350

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


<FiAlertTriangle className="
mx-auto
text-3xl
text-yellow-400
"/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

14

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


<FiBox className="
mx-auto
text-3xl
text-red-400
"/>


<h3 className="
text-xl
font-bold
text-white
mt-3
">

8

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









{/* SALES GROWTH + TOP PRODUCTS */}



<div className="
grid
gap-6
lg:grid-cols-2
">


<SalesTrend/>


<TopProducts/>


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



<button className="
text-cyan-400
text-sm
hover:text-cyan-300
">

View all

</button>


</div>








<div className="
mt-6
space-y-4
">


{


orders.map((order)=>(


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

{order.id} • {order.price}

</p>


</div>







<div className="
flex
items-center
gap-2
">


{

order.status==="Completed"

?

<FiCheckCircle className="
text-green-400
text-xl
"/>

:

<FiClock className="
text-yellow-400
text-xl
"/>

}



<span className="
text-slate-300
">

{order.status}

</span>


</div>





</div>


))


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


transition={{
duration:.5
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








{/* PROFIT */}



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

₹4.82L

</h4>


<p className="
text-sm
text-slate-300
mt-2
">

+12% growth this month

</p>


</div>








{/* LOSS */}



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

₹38.5K

</h4>


<p className="
text-sm
text-slate-300
mt-2
">

Low selling products affecting revenue

</p>


</div>








{/* DEAD STOCK */}



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

12

</h4>


<p className="
text-sm
text-slate-300
mt-2
">

Items inactive for 30 days

</p>


</div>








{/* FORECAST */}



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

+18%

</h4>


<p className="
text-sm
text-slate-300
mt-2
">

Expected sales increase

</p>


</div>






</div>






</motion.div>









</div>


</DashboardLayout>


)


}