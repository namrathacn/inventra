import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPackage,
  FiBarChart,
  FiAlertTriangle,
  FiDownload,
  FiFileText
} from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import {
  motion
} from "framer-motion";


import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";
import { useData } from "../../context/DataContext";



export default function Reports(){



const {
  currencySymbol,
  convertAmount,
} = useCurrency();

const {
  products,
  orders,
} = useData();

const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.amount || 0),
  0
);

const totalOrders = orders.length;

const totalProducts = products.length;

const totalStock = products.reduce(
  (sum, product) => sum + Number(product.stock || 0),
  0
);

const lowStock = products.filter(
  (product) => Number(product.stock) <= 5
).length;

const totalProfit = totalRevenue * 0.30;

const totalLoss = totalRevenue * 0.05;
const orderStatus = {

  completed: orders.filter(
    (order) =>
      order.status === "Completed"
  ).length,


  pending: orders.filter(
    (order) =>
      order.status === "Pending"
  ).length,


  cancelled: orders.filter(
    (order) =>
      order.status === "Cancelled"
  ).length,

};
const topProducts = products
  .map((product) => {
    const sold = orders
      .filter((order) => order.product === product.name)
      .reduce(
        (sum, order) => sum + Number(order.quantity || 0),
        0
      );

    return {
      ...product,
      sold,
    };
  })
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 5);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlySales = months.map((month, index) => {
  const revenue = orders
    .filter((order) => {
      if (!order.createdAt) return false;

      let date;

      if (order.createdAt.seconds) {
        date = new Date(order.createdAt.seconds * 1000);
      } else {
        date = new Date(order.createdAt);
      }

      return date.getMonth() === index;
    })
    .reduce(
      (sum, order) => sum + Number(order.amount || 0),
      0
    );

  return {
    month,
    value: revenue,
  };
});
console.log("Orders:", orders);
console.log("Monthly Sales:", monthlySales);



const exportCSV = () => {

  console.log("Export Orders:", orders);

  if (!orders || orders.length === 0) {
    alert("No orders available to export");
    return;
  }

  const rows = orders.map((order) => ({
    Product:
      order.productName ||
      order.product ||
      "Unknown",

    Quantity:
      order.quantity || 0,

    Amount:
 `${currencySymbol === "₹" ? "INR" : currencySymbol} ${Math.round(
  convertAmount(
    order.total ||
    order.amount ||
    0
  )
)}`,

    Status:
      order.status || "Pending",
  }));


  const csvContent = [
    Object.keys(rows[0]).join(","),
    ...rows.map((row)=>Object.values(row).join(","))
  ].join("\n");


  const blob = new Blob(
    [csvContent],
    {type:"text/csv"}
  );


  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download="inventra-report.csv";

  link.click();

};



const exportPDF = () => {
   const pdfCurrency =
    currencySymbol === "₹"
      ? "INR"
      : currencySymbol === "$"
      ? "USD"
      : currencySymbol;
  if (!orders || orders.length === 0) {
    alert("No orders available to export");
    return;
  }


  const doc = new jsPDF();


 doc.text(
  `Inventra Sales Report - ${pdfCurrency}`,
  14,
  15
);


  autoTable(doc,{
    startY:25,

    head:[
      [
        "Product",
        "Quantity",
        "Amount",
        "Status"
      ]
    ],

    body: orders.map((order)=>[
      order.productName ||
      order.product ||
      "Unknown",

      order.quantity || 0,

      `${
  currencySymbol === "₹"
    ? "INR"
    : currencySymbol === "$"
    ? "USD"
    : currencySymbol
} ${
  Math.round(
    convertAmount(
      order.total ||
      order.amount ||
      0
    )
  )
}`,

      order.status ||
      "Pending"
    ])

  });


  doc.save("inventra-report.pdf");

};




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
flex
justify-between
items-center
"

>


<div>

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

</div>



<div className="
flex
gap-4
">


<button
onClick={exportPDF}
className="
group
flex
items-center
gap-3
rounded-2xl
px-5
py-3
border
border-white/10
bg-white/5
backdrop-blur-xl
text-white
hover:bg-white/10
hover:border-cyan-400/40
transition
duration-300
"
>

<FiFileText
className="
text-cyan-400
text-xl
group-hover:scale-110
transition
"
/>

Export PDF

</button>



<button
onClick={exportCSV}
className="
group
flex
items-center
gap-3
rounded-2xl
px-5
py-3
border
border-cyan-400/20
bg-gradient-to-r
from-cyan-500/20
to-blue-600/20
backdrop-blur-xl
text-white
hover:from-cyan-500/30
hover:to-blue-600/30
transition
duration-300
"
>

<FiDownload
className="
text-cyan-300
text-xl
group-hover:translate-y-1
transition
"
/>

Export CSV

</button>


</div>



</motion.div>








{/* SUMMARY CARDS */}



<div className="
grid
gap-6
md:grid-cols-4
">




<Card
  title="Revenue"
  value={`${currencySymbol}${Math.round(
    convertAmount(totalRevenue)
  ).toLocaleString()}`}
  icon={<FiDollarSign />}
  color="text-cyan-400"
/>

<Card
  title="Orders"
  value={totalOrders}
  icon={<FiBarChart />}
  color="text-blue-400"
/>

<Card
  title="Products"
  value={totalProducts}
  icon={<FiPackage />}
  color="text-purple-400"
/>

<Card
  title="Low Stock"
  value={lowStock}
  icon={<FiAlertTriangle />}
  color="text-yellow-400"
/>




</div>
{/* Top Selling Products */}
<div
  className="
    mt-6
    rounded-3xl
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    p-6
  "
>

  <h2
    className="
      text-xl
      font-semibold
      text-white
      mb-5
    "
  >
    Top Selling Products
  </h2>


  <div className="space-y-4">

    {topProducts.length === 0 ? (

      <p className="text-gray-400">
        No sales data available
      </p>

    ) : (

      topProducts.map((product, index) => (

        <div
          key={product.id || index}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/5
            border
            border-white/10
            px-5
            py-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                h-10
                w-10
                rounded-xl
                bg-gradient-to-br
                from-cyan-500
                to-blue-600
                flex
                items-center
                justify-center
                text-white
                font-bold
              "
            >
              {index + 1}
            </div>


            <div>

              <p className="text-white font-medium">
                {product.name}
              </p>

              <p className="text-sm text-gray-400">
                {product.sold} units sold
              </p>

            </div>

          </div>


          <p className="text-cyan-400 font-semibold">
            ₹{product.price}
          </p>


        </div>

      ))

    )}

  </div>


</div>



{/* ORDER STATUS */}

<div
className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
"
>

<h2
className="
text-xl
font-bold
text-white
mb-5
"
>
Order Status
</h2>


<div
className="
grid
md:grid-cols-3
gap-5
"
>


<div
className="
rounded-2xl
bg-green-500/10
border
border-green-400/20
p-5
"
>

<p className="text-slate-400">
Completed
</p>

<h3 className="
text-3xl
font-bold
text-white
mt-2
">
{orderStatus.completed}
</h3>

</div>



<div
className="
rounded-2xl
bg-yellow-500/10
border
border-yellow-400/20
p-5
"
>

<p className="text-slate-400">
Pending
</p>

<h3 className="
text-3xl
font-bold
text-white
mt-2
">
{orderStatus.pending}
</h3>

</div>



<div
className="
rounded-2xl
bg-red-500/10
border
border-red-400/20
p-5
"
>

<p className="text-slate-400">
Cancelled
</p>

<h3 className="
text-3xl
font-bold
text-white
mt-2
">
{orderStatus.cancelled}
</h3>

</div>


</div>

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
  height: `${Math.max(
    (item.value / Math.max(...monthlySales.map((m) => m.value), 1)) * 100,
    5
  )}%`,
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



<div className="text-center">

<p className="text-[10px] text-cyan-300 mb-2">
{currencySymbol}
{Math.round(convertAmount(item.value)).toLocaleString()}
</p>

<span className="text-xs text-slate-400">
{item.month}
</span>

</div>



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

{currencySymbol}
{Math.round(convertAmount(totalProfit)).toLocaleString()}

</p>





<p className="
text-green-400
mt-2
">

Estimated 30% business profit

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

{currencySymbol}
{Math.round(convertAmount(totalLoss)).toLocaleString()}

</p>





<p className="
text-red-400
mt-2
">

Estimated 5% operational loss

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

{totalStock}

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

{lowStock}

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

{totalOrders === 0
  ? "0%"
  : `${Math.round(
      (totalRevenue / totalOrders) / 100
    )}%`}

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