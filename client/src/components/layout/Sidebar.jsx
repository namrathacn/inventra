import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiPieChart,
  FiUsers,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "./Logo";


const links = [

  {
    name:"Dashboard",
    path:"/dashboard",
    icon:<FiGrid/>
  },

  {
    name:"Products",
    path:"/products",
    icon:<FiPackage/>
  },

  {
    name:"Orders",
    path:"/orders",
    icon:<FiShoppingCart/>
  },

  {
    name:"Reports",
    path:"/reports",
    icon:<FiPieChart/>
  },

  {
    name:"Staff",
    path:"/staff",
    icon:<FiUsers/>
  },

  {
    name:"Profile",
    path:"/profile",
    icon:<FiUser/>
  },

  {
    name:"Settings",
    path:"/settings",
    icon:<FiSettings/>
  }

];



export default function Sidebar(){

return(


<motion.aside

initial={{
x:-80,
opacity:0
}}

animate={{
x:0,
opacity:1
}}

transition={{
duration:.6
}}

className="
m-4
flex
min-h-[calc(100vh-32px)]
w-72
flex-col
rounded-[32px]
border
border-white/10
bg-white/[0.05]
backdrop-blur-2xl
shadow-2xl
"


>


<div className="p-7">

<Logo/>

</div>





<nav className="flex-1 space-y-2 px-4">


{
links.map((item)=>(


<NavLink

key={item.path}

to={item.path}


className={({isActive})=>

`
group
relative
flex
items-center
gap-4
rounded-2xl
px-5
py-4
transition-all
duration-300

${
isActive
?
"bg-blue-500/20 text-white shadow-lg shadow-blue-500/20"
:
"text-slate-400 hover:bg-white/10 hover:text-white"
}

`

}


>


{({isActive})=>(

<>


{
isActive && (

<motion.div

layoutId="active"

className="
absolute
left-0
h-10
w-1
rounded-full
bg-cyan-400
"

/>

)

}



<motion.span

whileHover={{
scale:1.2,
rotate:8
}}

className="
text-xl
"

>

{item.icon}

</motion.span>



<span className="
font-medium
tracking-wide
">

{item.name}

</span>



</>

)}


</NavLink>


))

}



</nav>






<div className="p-5">


<motion.div

whileHover={{
scale:1.03
}}

className="
rounded-3xl
border
border-cyan-400/20
bg-cyan-400/10
p-5
"

>


<p className="
font-display
font-bold
text-cyan-300
">

Inventra Pro

</p>


<p className="
mt-2
text-sm
leading-6
text-slate-400
">

Smart inventory management.

</p>


</motion.div>


</div>




</motion.aside>


)

}