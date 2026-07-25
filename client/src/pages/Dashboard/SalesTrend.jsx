import {
FiTrendingUp
} from "react-icons/fi";


import {
motion
} from "framer-motion";



export default function SalesTrend(){



const sales=[


{
month:"Jan",
value:45
},

{
month:"Feb",
value:60
},

{
month:"Mar",
value:52
},

{
month:"Apr",
value:80
},

{
month:"May",
value:95
}


];




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

Sales Growth

</h2>


<p className="
text-sm
text-slate-400
mt-1
">

Monthly revenue growth

</p>


</div>





<div className="
rounded-2xl
bg-green-500/20
p-3
">


<FiTrendingUp

className="
text-2xl
text-green-400
"

/>


</div>


</div>








<div className="
mt-8
h-56
flex
items-end
gap-5
rounded-2xl
bg-black/10
p-5
">


{

sales.map((item,index)=>(


<div

key={item.month}

className="
flex
flex-1
h-full
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

delay:index*0.15

}}


className="
w-full
rounded-t-xl
bg-gradient-to-t
from-blue-600
via-cyan-400
to-green-400
"


>



</motion.div>





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







<div className="
grid
grid-cols-2
gap-4
mt-6
">


<div className="
rounded-2xl
bg-white/5
p-4
">


<p className="
text-sm
text-slate-400
">

Growth

</p>


<h3 className="
text-2xl
font-bold
text-green-400
">

+18.4%

</h3>


</div>





<div className="
rounded-2xl
bg-white/5
p-4
">


<p className="
text-sm
text-slate-400
">

Highest Sales

</p>


<h3 className="
text-2xl
font-bold
text-white
">

May

</h3>


</div>



</div>





</motion.div>


)

}