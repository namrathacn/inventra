import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";


import {useCurrency} from "../../context/CurrencyContext";



export default function RevenueChart(){


const {
currencySymbol,
convertAmount
}=useCurrency();



const data=[

{
day:"Mon",
revenue:1200
},

{
day:"Tue",
revenue:1800
},

{
day:"Wed",
revenue:1500
},

{
day:"Thu",
revenue:2700
},

{
day:"Fri",
revenue:2300
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


<div className="
h-[350px]
w-full
">


<ResponsiveContainer width="100%" height="100%">


<LineChart data={data}>


<CartesianGrid 
strokeDasharray="3 3"
opacity={0.1}
/>



<XAxis

dataKey="day"

/>



<YAxis/>




<Tooltip

formatter={(value)=>

`${currencySymbol}${convertAmount(value)}`

}


/>



<Line

type="monotone"

dataKey="revenue"

stroke="#3b82f6"

strokeWidth={4}

dot={{r:5}}

/>



</LineChart>


</ResponsiveContainer>



</div>



)


}