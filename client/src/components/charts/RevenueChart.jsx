import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import { useCurrency } from "../../context/CurrencyContext";



export default function RevenueChart(){


const { currency } = useCurrency();



const data=[

{
day:"Mon",
revenue:1200
},

{
day:"Tue",
revenue:2100
},

{
day:"Wed",
revenue:1600
},

{
day:"Thu",
revenue:2800
},

{
day:"Fri",
revenue:2400
},

{
day:"Sat",
revenue:3500
},

{
day:"Sun",
revenue:4200
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
backdrop-blur-xl
"


>


<h2 className="
mb-6
text-2xl
font-bold
text-white
">

Revenue Analytics

</h2>




<ResponsiveContainer

width="100%"

height={350}

>


<LineChart data={data}>


<CartesianGrid

strokeDasharray="3 3"

stroke="rgba(255,255,255,0.1)"

/>



<XAxis

dataKey="day"

stroke="#94A3B8"

/>



<YAxis

stroke="#94A3B8"

/>




<Tooltip


contentStyle={{

background:"#111827",

border:"1px solid rgba(255,255,255,.1)",

borderRadius:"16px",

color:"white"

}}



formatter={(value)=>[

`${currency.symbol}${Math.round(value * currency.rate).toLocaleString()}`,

"Revenue"

]}


/>





<Line

type="monotone"

dataKey="revenue"

stroke="#3B82F6"

strokeWidth={4}

dot={{

r:5,

fill:"#3B82F6"

}}


/>



</LineChart>


</ResponsiveContainer>




</motion.div>


)

}