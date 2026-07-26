import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FiBell,
  FiUser,
  FiDatabase,
  FiCpu,
  FiShield,
  FiSettings
} from "react-icons/fi";

import { motion } from "framer-motion";


const cards = [

{
title:"Business Profile",
desc:"Update store details, contact information and business preferences.",
icon:FiUser,
color:"from-cyan-500 to-blue-500"
},

{
title:"Appearance",
desc:"Customize dashboard appearance and experience.",
icon:FiSettings,
color:"from-purple-500 to-pink-500"
},

{
title:"Notifications",
desc:"Manage stock alerts, reports and inventory reminders.",
icon:FiBell,
color:"from-green-500 to-emerald-500"
},

{
title:"Inventra AI",
desc:"Enable smart stock predictions and inventory suggestions.",
icon:FiCpu,
color:"from-blue-500 to-indigo-500"
},

{
title:"Data Management",
desc:"Backup, export and manage inventory data.",
icon:FiDatabase,
color:"from-orange-500 to-yellow-500"
},

{
title:"Security",
desc:"Manage password and account security settings.",
icon:FiShield,
color:"from-red-500 to-rose-500"
}

];



export default function Settings(){


return(

<DashboardLayout>


<div className="space-y-8">



{/* HEADER */}

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

className="
rounded-3xl
bg-white/5
border
border-white/10
p-8
backdrop-blur-xl
shadow-2xl
"

>


<h1
className="
text-3xl
font-bold
text-white
"
>
Settings
</h1>


<p
className="
mt-2
text-slate-400
"
>
Manage your Inventra preferences and system controls
</p>


</motion.div>





{/* CARDS */}


<div
className="
grid
gap-6
md:grid-cols-2
"
>


{
cards.map((item,index)=>{


const Icon=item.icon;


return(


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
delay:index*0.08,
duration:0.45
}}


whileHover={{
y:-8,
scale:1.02
}}


className="
group
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
shadow-xl
transition
"


>


{/* Glow */}


<div

className={`
absolute
-right-10
-top-10
h-32
w-32
rounded-full
bg-gradient-to-br
${item.color}
opacity-20
blur-3xl
group-hover:opacity-50
transition
`}

/>



<div className="relative z-10">


<div

className={`
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-gradient-to-br
${item.color}
shadow-lg
mb-5
`}

>

<Icon
className="
text-2xl
text-white
"
/>


</div>




<h2
className="
text-xl
font-bold
text-white
"
>

{item.title}

</h2>




<p
className="
mt-2
text-slate-400
leading-relaxed
"
>

{item.desc}

</p>



</div>



</motion.div>


)


})

}


</div>



</div>


</DashboardLayout>


)

}