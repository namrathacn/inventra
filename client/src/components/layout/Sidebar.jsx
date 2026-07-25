import {

FiGrid,
FiPackage,
FiShoppingCart,
FiPieChart,
FiUsers,
FiUser,
FiSettings

} from "react-icons/fi";


import {
NavLink
} from "react-router-dom";


import {
motion
} from "framer-motion";


import Logo from "./Logo";





const links=[


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


<aside className="

relative

h-screen

w-72

shrink-0

border-r

border-white/10

bg-white/[0.04]

backdrop-blur-2xl

p-6

">






<Logo/>







<nav className="

mt-10

space-y-3

">


{

links.map((item,index)=>(



<motion.div


key={item.path}


initial={{

x:-25,

opacity:0

}}


animate={{

x:0,

opacity:1

}}


transition={{

delay:index*.08

}}


>


<NavLink


to={item.path}



className={({isActive})=>`


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

"bg-blue-600 text-white shadow-lg shadow-blue-500/30"

:

"text-slate-400 hover:bg-white/10 hover:text-white"

}



`}



>



<motion.span


whileHover={{

scale:1.2,

x:5

}}



className="

text-xl

"


>


{item.icon}


</motion.span>





<span className="

font-medium

">


{item.name}


</span>



</NavLink>



</motion.div>



))


}



</nav>










{/* Bottom Card */}



<div className="

absolute

bottom-6

left-6

right-6

rounded-3xl

border

border-cyan-400/20

bg-cyan-400/10

p-5

backdrop-blur-xl

">


<h3 className="

font-bold

text-cyan-300

">


Inventra Pro


</h3>



<p className="

mt-2

text-sm

text-slate-400

">


Smart inventory management


</p>



</div>






</aside>


)


}