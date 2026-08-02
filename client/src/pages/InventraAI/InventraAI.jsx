import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FiCpu,
  FiTrendingUp,
  FiBox,
  FiActivity,
  FiCheckCircle,
  FiArrowLeft
} from "react-icons/fi";


export default function InventraAI(){


const navigate = useNavigate();


const [active,setActive] = useState(
JSON.parse(localStorage.getItem("inventraAI")) || {}
);



const features = [


{
title:"Stock Prediction",
description:
"Predict future inventory demand using sales trends.",
icon:<FiTrendingUp/>,
value:"Expected demand +18%",
recommendation:
"Increase laptop and accessory stock"
},



{
title:"Smart Recommendations",
description:
"Get suggestions for purchasing and stock management.",
icon:<FiBox/>,
value:"15 products optimized",
recommendation:
"Restock fast moving products"
},



{
title:"AI Analytics",
description:
"Analyze inventory performance and business patterns.",
icon:<FiActivity/>,
value:"Inventory efficiency 92%",
recommendation:
"Reduce slow moving stock"
}



];




function toggleAI(title){


const updated={

...active,

[title]: !active[title]

};


setActive(updated);


localStorage.setItem(
"inventraAI",
JSON.stringify(updated)
);


}





return(


<DashboardLayout>


<div className="relative space-y-10">


{/* Background Glow */}


<div className="
absolute
top-0
left-10
w-72
h-72
rounded-full
bg-purple-500/10
blur-[120px]
"/>



<div className="
absolute
bottom-0
right-10
w-72
h-72
rounded-full
bg-cyan-500/10
blur-[120px]
"/>




<div className="relative space-y-8">



<button

onClick={()=>navigate("/settings")}

className="
flex
items-center
gap-2
text-cyan-400
hover:text-cyan-300
transition
"

>

<FiArrowLeft/>

Back to Settings

</button>






<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

>


<h1 className="
text-4xl
font-black
text-white
flex
items-center
gap-3
">

<FiCpu
className="text-purple-400"
/>

Inventra AI

</h1>



<p className="
text-gray-400
mt-3
">

AI powered inventory forecasting and intelligent recommendations.

</p>



</motion.div>









<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
rounded-3xl
bg-[#111827]/80
backdrop-blur-xl
border
border-white/10
p-8
shadow-xl
"

>


<div className="
flex
justify-between
items-center
flex-wrap
gap-5
">


<div>


<h2 className="
text-2xl
font-bold
text-white
">

AI Inventory Assistant

</h2>


<p className="
text-gray-400
mt-2
">

Analyze inventory data and generate smart business insights.

</p>


</div>





<div className="
px-5
py-2
rounded-xl
bg-purple-500/20
border
border-purple-400/30
text-purple-300
flex
items-center
gap-2
">


<FiCpu/>

AI Ready

</div>


</div>









<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



{

features.map((item,index)=>(


<motion.div


key={item.title}


whileHover={{
y:-8,
scale:1.02
}}


onClick={()=>toggleAI(item.title)}


className="
cursor-pointer
rounded-3xl
bg-black/20
border
border-white/10
p-6
hover:border-purple-400/40
transition
"


>


<div className="
w-14
h-14
rounded-2xl
bg-gradient-to-br
from-purple-500
to-indigo-600
flex
items-center
justify-center
text-white
text-2xl
mb-5
">


{item.icon}


</div>






<h3 className="
text-white
font-bold
text-xl
">

{item.title}

</h3>






<p className="
text-gray-400
text-sm
mt-3
">

{item.description}

</p>








<div className="
mt-5
rounded-xl
bg-white/5
border
border-white/10
p-4
">


<p className="
text-cyan-300
font-semibold
">

{item.value}

</p>



<p className="
text-gray-400
text-sm
mt-2
">

{item.recommendation}

</p>



</div>









<button

className={`
mt-5
px-5
py-2
rounded-xl
flex
items-center
gap-2
transition

${
active[item.title]

?

"bg-green-500/20 text-green-300"

:

"bg-purple-500/20 text-purple-300"

}

`}

>


{

active[item.title]

?

<>

<FiCheckCircle/>

AI Enabled

</>

:

"Enable AI"

}



</button>





</motion.div>


))


}



</div>




</motion.div>







<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
rounded-3xl
bg-white/5
border
border-white/10
p-8
"

>


<h2 className="
text-2xl
font-bold
text-white
">

Future AI Features

</h2>


<div className="
grid
md:grid-cols-3
gap-5
mt-5
">


<div className="
rounded-xl
bg-black/20
p-5
text-gray-300
">

📈 Sales Forecasting

</div>


<div className="
rounded-xl
bg-black/20
p-5
text-gray-300
">

📦 Auto Restocking

</div>


<div className="
rounded-xl
bg-black/20
p-5
text-gray-300
">

🤖 Business Assistant

</div>


</div>


</motion.div>





</div>


</div>


</DashboardLayout>


)

}