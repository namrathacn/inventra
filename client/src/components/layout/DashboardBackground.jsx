import { motion } from "framer-motion";


const circles = [

{
size:180,
top:"10%",
left:"15%",
color:"bg-cyan-400/20",
duration:8
},

{
size:250,
top:"60%",
left:"75%",
color:"bg-purple-500/20",
duration:10
},

{
size:120,
top:"35%",
left:"85%",
color:"bg-blue-500/20",
duration:6
},

{
size:200,
top:"80%",
left:"25%",
color:"bg-emerald-400/10",
duration:12
}

];



export default function DashboardBackground(){


return(

<div className="
pointer-events-none
fixed
inset-0
overflow-hidden
-z-10
">


{


circles.map((item,index)=>(


<motion.div


key={index}


animate={{

y:[
0,
-40,
0
],

x:[
0,
20,
0
]


}}


transition={{

duration:item.duration,

repeat:Infinity,

ease:"easeInOut"

}}


style={{

width:item.size,

height:item.size,

top:item.top,

left:item.left

}}


className={`
absolute
rounded-full
blur-3xl
${item.color}
`}


/>


))


}






{/* tiny floating dots */}


{

Array.from({length:20}).map((_,i)=>(


<motion.span

key={i}

animate={{

opacity:[
0.2,
0.8,
0.2
],

y:[
0,
-30,
0
]


}}


transition={{

duration:3+i%5,

repeat:Infinity,

delay:i*.2

}}


style={{

left:`${Math.random()*100}%`,

top:`${Math.random()*100}%`

}}


className="
absolute
h-1.5
w-1.5
rounded-full
bg-cyan-300
"


/>


))

}



</div>


)

}