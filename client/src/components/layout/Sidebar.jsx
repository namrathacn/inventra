import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiBarChart2,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
  FiPackage
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";


const menuItems=[
{
name:"Dashboard",
path:"/dashboard",
icon:FiHome
},
{
name:"Products",
path:"/products",
icon:FiBox
},
{
name:"Orders",
path:"/orders",
icon:FiShoppingCart
},
{
name:"Reports",
path:"/reports",
icon:FiBarChart2
},
{
name:"Staff",
path:"/staff",
icon:FiUsers
},
{
name:"Profile",
path:"/profile",
icon:FiUser
},
{
name:"Settings",
path:"/settings",
icon:FiSettings
}
];



export default function Sidebar(){


const {
user,
logout
}=useAuth();


const navigate=useNavigate();



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
fixed
top-0
left-0
h-screen
w-72
flex
flex-col
overflow-hidden
bg-[#050816]/90
backdrop-blur-2xl
border-r
border-white/10
px-5
py-6
"

>


{/* animated background */}

<motion.div

animate={{
scale:[1,1.2,1]
}}

transition={{
duration:8,
repeat:Infinity
}}

className="
absolute
-left-20
-top-20
h-72
w-72
rounded-full
bg-cyan-500/20
blur-3xl
"

/>



<motion.div

animate={{
scale:[1,1.3,1]
}}

transition={{
duration:10,
repeat:Infinity
}}

className="
absolute
-right-20
-bottom-20
h-72
w-72
rounded-full
bg-purple-500/20
blur-3xl
"

/>





{/* BRAND */}


<div
className="
relative
z-10
mb-10
flex
items-center
gap-4
"
>


<motion.div

whileHover={{
rotate:10,
scale:1.1
}}

className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-cyan-400
via-blue-500
to-purple-600
flex
items-center
justify-center
shadow-xl
shadow-cyan-500/30
"

>

<FiPackage
className="
text-white
text-3xl
"
/>


</motion.div>




<div>

<h1
className="
text-3xl
font-black
tracking-tight
text-white
"
>
Inventra
</h1>


<p
className="
text-xs
tracking-widest
text-cyan-400
"
>
SMART INVENTORY
</p>


</div>



</div>







{/* MENU */}


<nav
className="
relative
z-10
flex-1
space-y-2
"
>


{
menuItems.map(item=>{


const Icon=item.icon;


return(

<NavLink
key={item.name}
to={item.path}
>


{({isActive})=>(


<motion.div

whileHover={{
x:8
}}

className={`
flex
items-center
gap-4
rounded-2xl
px-4
py-3
transition-all

${
isActive
?
"bg-white/10 text-white shadow-lg border border-white/10"
:
"text-slate-400 hover:text-white hover:bg-white/5"
}

`}

>


<Icon
className="text-xl"
/>


<span className="font-semibold">

{item.name}

</span>


</motion.div>


)}


</NavLink>


)

})
}


</nav>







{/* USER */}

<div
className="
relative
z-10
rounded-3xl
border
border-white/10
bg-white/5
p-4
backdrop-blur-xl
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
h-11
w-11
rounded-xl
bg-gradient-to-br
from-pink-500
to-purple-600
flex
items-center
justify-center
font-bold
text-white
"
>

{
user?.name?.charAt(0) || "A"
}

</div>


<div>

<p className="
text-white
font-semibold
">

{
user?.name || "Admin"
}

</p>

<p className="
text-xs
text-slate-400
">
Store Manager
</p>

</div>


</div>



<button

onClick={()=>{

logout();

navigate("/");

}}

className="
mt-4
w-full
rounded-xl
bg-red-500/10
py-2
text-red-400
font-semibold
hover:bg-red-500/20
transition
"

>

<FiLogOut className="inline mr-2"/>

Logout

</button>


</div>




</motion.aside>

)

}