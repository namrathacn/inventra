import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FiDollarSign,
  FiBox,
  FiShoppingCart,
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
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
  products
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
  value={formatCurrency(totalRevenue)}
  isCurrency={false}
  icon={<FiDollarSign />}
  glowColor="bg-emerald-500"
  iconBackground="bg-emerald-500/20"
  iconColor="text-emerald-400"
/>

<StatCard
  title="Orders"
  value={orders.length}
  icon={<FiShoppingCart />}
  glowColor="bg-blue-500"
  iconBackground="bg-blue-500/20"
  iconColor="text-blue-400"
/>

<StatCard
  title="Products"
  value={products.length}
  icon={<FiBox />}
  glowColor="bg-purple-500"
  iconBackground="bg-purple-500/20"
  iconColor="text-purple-400"
/>

<StatCard
  title="Low Stock"
  value={lowStock}
  icon={<FiAlertTriangle />}
  glowColor="bg-yellow-500"
  iconBackground="bg-yellow-500/20"
  iconColor="text-yellow-400"
/>






</div>





<RevenueChart />






<div
className="
grid
gap-6
lg:grid-cols-1
"
>

<motion.div

initial={{ opacity:0, y:20 }}
animate={{ opacity:1, y:0 }}

className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
"

>

<h2 className="text-xl font-bold text-white">
Inventory Status
</h2>

<p className="text-sm text-slate-400 mt-1">
Current stock overview
</p>

<div className="grid grid-cols-3 gap-4 mt-8">

<div className="rounded-2xl bg-green-500/10 p-5 text-center">

<FiBox className="mx-auto text-3xl text-green-400"/>

<h3 className="text-xl font-bold text-white mt-3">
{availableStock}
</h3>

<p className="text-sm text-slate-400">
Available
</p>

</div>

<div className="rounded-2xl bg-yellow-500/10 p-5 text-center">

<FiAlertTriangle className="mx-auto text-3xl text-yellow-400"/>

<h3 className="text-xl font-bold text-white mt-3">
{lowStock}
</h3>

<p className="text-sm text-slate-400">
Low Stock
</p>

</div>

<div className="rounded-2xl bg-red-500/10 p-5 text-center">

<FiBox className="mx-auto text-3xl text-red-400"/>

<h3 className="text-xl font-bold text-white mt-3">
{outOfStock}
</h3>

<p className="text-sm text-slate-400">
Out Of Stock
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






</div>


</DashboardLayout>


);

}