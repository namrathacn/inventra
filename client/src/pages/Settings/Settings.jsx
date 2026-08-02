import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";


import {
  FiUser,
  FiBell,
  FiCpu,
  FiDatabase,
  FiShield,
  FiArrowRight
} from "react-icons/fi";



export default function Settings(){


const navigate = useNavigate();



const settings=[

{
title:"Business Profile",
description:"Manage company details, business information and workspace preferences.",
icon:<FiUser/>,
path:"/profile",
gradient:"from-cyan-400 to-blue-600"
},


{
title:"Notifications",
description:"Control alerts, reports and inventory reminders.",
icon:<FiBell/>,
path:"/notifications",
gradient:"from-emerald-400 to-green-600"
},


{
title:"Inventra AI",
description:"Enable intelligent forecasting and inventory insights.",
icon:<FiCpu/>,
path:"/ai",
gradient:"from-purple-500 to-indigo-600"
},


{
title:"Database",
description:"Manage storage, backups and inventory records.",
icon:<FiDatabase/>,
path:"/database",
gradient:"from-orange-400 to-yellow-500"
},


{
title:"Security",
description:"Protect your account and manage access permissions.",
icon:<FiShield/>,
path:"/security",
gradient:"from-red-500 to-pink-600"
}

];





return(


<DashboardLayout>


<div className="
relative
min-h-screen
overflow-hidden
bg-transparent
">





{/* Neon Background Blur */}


<div className="
absolute
top-10
left-10
w-80
h-80
rounded-full
bg-cyan-500/10
blur-[120px]
"
/>



<div className="
absolute
bottom-10
right-10
w-96
h-96
rounded-full
bg-purple-500/10
blur-[120px]
"
/>







<div className="
relative
space-y-10
">







<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.5
}}

>


<h1 className="
text-4xl
font-black
text-white
">

Settings

</h1>


<p className="
mt-3
text-gray-400
">

Manage your Inventra workspace, AI tools, database and security.

</p>


</motion.div>









<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-7
">





{

settings.map((item,index)=>(



<motion.div


key={item.title}


initial={{

opacity:0,

y:40

}}


animate={{

opacity:1,

y:0

}}



transition={{

delay:index*0.12,

duration:0.5

}}



whileHover={{

y:-8,

scale:1.02

}}



onClick={() => {
  if (item.path !== "#") {
    navigate(item.path);
  }
}}




className="
group
cursor-pointer
relative
rounded-3xl
overflow-hidden
"

>



{/* Glow Border */}

<div className={`
absolute
inset-0
rounded-3xl
bg-gradient-to-br
${item.gradient}
opacity-20
blur-xl
group-hover:opacity-50
transition
duration-500
`}
/>






{/* Glass Card */}

<div className="
relative
rounded-3xl
bg-[#0b1220]/80
backdrop-blur-2xl
border
border-white/10
p-7
shadow-xl
hover:border-cyan-400/40
transition
duration-300
">







<div className={`
w-16
h-16
rounded-2xl
bg-gradient-to-br
${item.gradient}
flex
items-center
justify-center
text-white
text-3xl
mb-6
shadow-lg
group-hover:rotate-6
transition
duration-300
`}>

{item.icon}

</div>








<h2 className="
text-2xl
font-bold
text-white
">


{item.title}


</h2>







<p className="
text-gray-400
mt-3
leading-relaxed
">


{item.description}


</p>







<div className="
mt-7
flex
items-center
gap-3
text-cyan-400
font-semibold
">


Open Settings


<FiArrowRight

className="
group-hover:translate-x-2
transition
"

/>


</div>







</div>





</motion.div>



))


}





</div>









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
delay:0.8
}}



className="
rounded-3xl
bg-[#0b1220]/70
backdrop-blur-2xl
border
border-cyan-400/20
p-8
shadow-xl
"

>



<h2 className="
text-2xl
font-bold
text-white
">


Inventra Workspace


</h2>




<p className="
text-gray-400
mt-2
">


Everything you need to manage your inventory system from one place.


</p>





<div className="
inline-flex
mt-5
px-5
py-2
rounded-full
bg-cyan-500/10
border
border-cyan-400/30
text-cyan-300
">


System Ready ✓


</div>





</motion.div>







</div>



</div>


</DashboardLayout>


)


}