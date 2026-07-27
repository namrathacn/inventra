import {
  FiPackage,
  FiArrowRight,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiShoppingCart,
  FiUsers,
  FiShield,
  FiBarChart2,
  FiZap
} from "react-icons/fi";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const fadeUp = {
  hidden:{
    opacity:0,
    y:50
  },

  show:{
    opacity:1,
    y:0,
    transition:{
      duration:0.8
    }
  }
};



export default function Home(){

const navigate = useNavigate();


return (

<div className="
min-h-screen
bg-[#020617]
text-white
overflow-hidden
relative
">



{/* ANIMATED BACKGROUND */}


<div className="
absolute
inset-0
overflow-hidden
pointer-events-none
">


<motion.div

animate={{
x:[0,120,0],
y:[0,-100,0],
scale:[1,1.2,1]
}}

transition={{
duration:18,
repeat:Infinity
}}

className="
absolute
top-[-200px]
left-[-200px]
w-[700px]
h-[700px]
rounded-full
bg-cyan-500/20
blur-[180px]
"

/>



<motion.div

animate={{
x:[0,-120,0],
y:[0,100,0],
scale:[1,1.25,1]
}}

transition={{
duration:20,
repeat:Infinity
}}

className="
absolute
right-[-200px]
top-[250px]
w-[650px]
h-[650px]
rounded-full
bg-blue-600/20
blur-[180px]
"

/>




<motion.div

animate={{
scale:[1,1.3,1],
opacity:[0.3,0.7,0.3]
}}

transition={{
duration:12,
repeat:Infinity
}}

className="
absolute
bottom-[-250px]
left-[35%]
w-[600px]
h-[600px]
rounded-full
bg-purple-500/20
blur-[170px]
"

/>





<motion.div

animate={{
y:[0,-60,0],
x:[0,40,0]
}}

transition={{
duration:8,
repeat:Infinity
}}

className="
absolute
top-[25%]
left-[10%]
h-5
w-5
rounded-full
bg-cyan-400
blur-sm
"

/>



<motion.div

animate={{
y:[0,70,0],
x:[0,-40,0]
}}

transition={{
duration:10,
repeat:Infinity
}}

className="
absolute
top-[60%]
right-[15%]
h-4
w-4
rounded-full
bg-purple-400
blur-sm
"

/>


</div>







{/* GLASS NAVBAR */}



<motion.nav

initial={{
opacity:0,
y:-40
}}

animate={{
opacity:1,
y:0
}}

className="
fixed
top-5
left-1/2
-translate-x-1/2
z-50
w-[90%]
max-w-7xl
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-2xl
px-8
py-5
flex
justify-between
items-center
"

>


<div className="
flex
items-center
gap-4
">


<motion.div

whileHover={{
scale:1.1,
rotate:10
}}

className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
shadow-lg
shadow-cyan-500/40
"

>

<FiPackage className="
text-3xl
"/>

</motion.div>




<div>

<h1 className="
text-2xl
font-black
">

Inventra

</h1>


<p className="
text-[10px]
tracking-[4px]
text-slate-400
">

SMART INVENTORY

</p>


</div>


</div>





<div className="
hidden
md:flex
gap-8
text-slate-300
">


<a href="#features">
Features
</a>


<a href="#analytics">
Analytics
</a>


<a href="#technology">
Technology
</a>


</div>



</motion.nav>









{/* HERO */}



<section className="
relative
z-10
max-w-7xl
mx-auto
px-8
pt-44
pb-32
grid
lg:grid-cols-2
gap-20
items-center
">



<motion.div

variants={fadeUp}

initial="hidden"

animate="show"

>


<div className="
inline-flex
items-center
gap-3
rounded-full
bg-cyan-500/10
border
border-cyan-400/30
px-5
py-2
text-cyan-300
">


<FiCheckCircle/>

Full Stack Inventory Platform


</div>




<h1 className="
mt-8
text-6xl
md:text-7xl
font-black
leading-tight
">


Manage Inventory


<br/>


<span className="
bg-gradient-to-r
from-cyan-400
via-blue-500
to-purple-500
bg-clip-text
text-transparent
">


Smarter


</span>


</h1>




<p className="
mt-8
text-xl
text-slate-400
max-w-xl
">

Inventra helps businesses manage products,
orders and analytics through one intelligent
dashboard.

</p>





<div className="
mt-10
flex
gap-5
">


<button

onClick={()=>navigate("/login")}

className="
px-8
py-4
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
font-bold
flex
items-center
gap-3
hover:scale-110
transition
"

>

Get Started

<FiArrowRight/>

</button>


</div>





<div className="
flex
gap-5
mt-12
">


<div className="
p-5
rounded-2xl
bg-white/5
border
border-white/10
backdrop-blur-xl
">


<FiLayers className="
text-cyan-400
text-3xl
"/>


<p className="
text-slate-400
mt-3
">

6+ Modules

</p>


</div>




<div className="
p-5
rounded-2xl
bg-white/5
border
border-white/10
backdrop-blur-xl
">


<FiTrendingUp className="
text-green-400
text-3xl
"/>


<p className="
text-slate-400
mt-3
">

Live Analytics

</p>


</div>



</div>



</motion.div>
<motion.div

initial={{
opacity:0,
x:80
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:1
}}

className="
relative
z-10
"

>




{/* REVENUE FLOATING CARD */}


<motion.div

animate={{
y:[0,-20,0]
}}

transition={{
duration:4,
repeat:Infinity
}}

className="
absolute
right-[-45px]
top-[-50px]
z-20
w-64
rounded-3xl
bg-white/10
border
border-white/20
backdrop-blur-2xl
p-5
shadow-xl
shadow-green-500/20
"

>


<div className="
flex
items-center
gap-4
">


<div className="
h-12
w-12
rounded-xl
bg-green-500/20
flex
items-center
justify-center
">


<FiTrendingUp className="
text-green-400
text-2xl
"/>


</div>



<div>


<p className="
text-sm
text-slate-400
">

Revenue Growth

</p>


<h3 className="
text-2xl
font-black
">

+24.8%

</h3>


</div>



</div>


</motion.div>









{/* DASHBOARD WINDOW */}


<motion.div

whileHover={{
scale:1.02
}}

className="
rounded-3xl
bg-[#07111f]
border
border-white/10
p-6
shadow-2xl
shadow-cyan-500/20
"

>


<div className="
flex
gap-2
border-b
border-white/10
pb-5
">


<div className="
h-3
w-3
rounded-full
bg-red-400
"/>


<div className="
h-3
w-3
rounded-full
bg-yellow-400
"/>


<div className="
h-3
w-3
rounded-full
bg-green-400
"/>


</div>






<div className="
mt-8
flex
justify-between
items-center
">


<div>


<p className="
text-slate-400
">

Business Overview

</p>


<h2 className="
text-3xl
font-black
">

Dashboard

</h2>


</div>




<div className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
">

<FiPackage className="
text-3xl
"/>

</div>


</div>








<div className="
grid
grid-cols-3
gap-4
mt-8
">


<DashboardCard

title="Products"

value="421"

/>


<DashboardCard

title="Orders"

value="267"

/>


<DashboardCard

title="Revenue"

value="£15.2K"

/>



</div>









<div

id="analytics"

className="
mt-8
rounded-2xl
bg-black/20
p-6
"

>


<div className="
flex
justify-between
">


<h3 className="
font-bold
">

Sales Performance

</h3>


<p className="
text-green-400
">

+18%

</p>


</div>







<div className="
mt-8
h-44
flex
items-end
gap-3
">


{

[40,65,50,90,70,100,80].map((value,index)=>(


<motion.div

key={index}

initial={{
height:0
}}

animate={{
height:`${value}%`
}}

transition={{
duration:0.8,
delay:index*0.1
}}

className="
flex-1
rounded-t-xl
bg-gradient-to-t
from-cyan-500
to-purple-500
"

/>


))


}



</div>


</div>








<div className="
grid
grid-cols-2
gap-5
mt-6
">


<div className="
rounded-2xl
bg-white/5
border
border-white/10
p-5
">


<FiPackage className="
text-cyan-400
text-2xl
"/>


<h3 className="
font-bold
mt-3
">

Laptop Pro

</h3>


<p className="
text-slate-400
">

120 items available

</p>


</div>






<div className="
rounded-2xl
bg-white/5
border
border-white/10
p-5
">


<FiTrendingUp className="
text-green-400
text-2xl
"/>


<h3 className="
font-bold
mt-3
">

Smart Watch

</h3>


<p className="
text-slate-400
">

45 items available

</p>


</div>



</div>





</motion.div>









{/* LATEST ORDER CARD */}


<motion.div

animate={{
y:[0,20,0]
}}

transition={{
duration:5,
repeat:Infinity
}}

className="
absolute
left-[-45px]
bottom-[-45px]
z-20
w-60
rounded-3xl
bg-white/10
border
border-white/20
backdrop-blur-2xl
p-5
shadow-xl
shadow-blue-500/20
"

>



<div className="
flex
items-center
gap-4
">


<div className="
h-12
w-12
rounded-xl
bg-blue-500/20
flex
items-center
justify-center
">


<FiShoppingCart className="
text-blue-400
text-2xl
"/>


</div>




<div>


<p className="
text-xs
text-slate-400
">

Latest Order

</p>


<h3 className="
font-black
">

#INV-1024

</h3>


</div>



</div>


</motion.div>




</motion.div>



</section>









{/* FEATURES SECTION */}



<section

id="features"

className="
relative
z-10
max-w-7xl
mx-auto
px-8
py-32
"

>


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
text-center
"

>


<p className="
text-cyan-400
font-bold
tracking-[5px]
">

FEATURES

</p>



<h2 className="
text-5xl
font-black
mt-5
">

Everything your business needs

</h2>



<p className="
mt-5
text-slate-400
text-lg
">

Smart inventory, orders, analytics and
business insights in one platform.

</p>


</motion.div>






<div className="
grid
md:grid-cols-3
gap-8
mt-16
">


<FeatureCard

icon={<FiPackage/>}

title="Inventory Management"

text="Track products and stock levels easily."

/>



<FeatureCard

icon={<FiShoppingCart/>}

title="Order Tracking"

text="Manage customer orders efficiently."

/>



<FeatureCard

icon={<FiTrendingUp/>}

title="Analytics"

text="Understand growth and performance."

/>



<FeatureCard

icon={<FiUsers/>}

title="Staff Management"

text="Manage users and roles."

/>



<FeatureCard

icon={<FiShield/>}

title="Security"

text="Protected authentication system."

/>



<FeatureCard

icon={<FiBarChart2/>}

title="Reports"

text="Generate business insights."

/>



</div>


</section>
{/* TECHNOLOGY SECTION */}


<section

id="technology"

className="
py-32
bg-white/[0.03]
border-y
border-white/10
"

>


<div className="
max-w-7xl
mx-auto
px-8
grid
lg:grid-cols-2
gap-16
items-center
">





<motion.div

initial={{
opacity:0,
x:-50
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

>


<p className="
text-cyan-400
font-bold
tracking-[5px]
">

TECHNOLOGY

</p>




<h2 className="
text-5xl
font-black
mt-5
">

Built with modern technology

</h2>




<p className="
mt-5
text-slate-400
text-lg
">

Inventra uses a modern full stack
architecture built for scalable inventory
management.

</p>






<div className="
mt-10
space-y-7
">


<Journey

number="01"

title="Add Products"

text="Create and organise inventory."

/>


<Journey

number="02"

title="Manage Orders"

text="Track sales and customer activity."

/>


<Journey

number="03"

title="Analyse Growth"

text="Make smarter business decisions."

/>



</div>



</motion.div>









<motion.div

initial={{
opacity:0,
scale:0.8
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

className="
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-10
shadow-xl
shadow-blue-500/20
"

>



<div className="
flex
items-center
gap-5
">


<div className="
h-16
w-16
rounded-2xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
">


<FiZap className="
text-3xl
"/>


</div>



<h2 className="
text-3xl
font-black
">

Tech Stack

</h2>



</div>







<div className="
grid
grid-cols-2
gap-5
mt-10
">


<TechCard

title="Frontend"

value="React + Vite"

/>



<TechCard

title="Styling"

value="Tailwind CSS"

/>



<TechCard

title="Backend"

value="Node.js"

/>



<TechCard

title="Database"

value="Firebase"

/>



</div>



</motion.div>





</div>


</section>









{/* FINAL CTA */}



<section className="
max-w-7xl
mx-auto
px-8
py-32
">


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
rounded-3xl
bg-gradient-to-r
from-cyan-500/20
via-blue-500/20
to-purple-500/20
border
border-white/10
backdrop-blur-xl
p-12
text-center
"

>



<h2 className="
text-5xl
font-black
">

Ready to manage smarter?

</h2>




<p className="
mt-5
text-slate-300
text-lg
">

Experience intelligent inventory
management with Inventra.

</p>






<button

onClick={()=>navigate("/login")}

className="
mt-8
px-10
py-4
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
font-bold
hover:scale-110
transition
"

>

Get Started

</button>




</motion.div>



</section>









<footer className="
border-t
border-white/10
py-8
text-center
text-slate-400
">

© 2026 Inventra Smart Inventory Management System

</footer>




</div>

);

}








function DashboardCard({
title,
value
}){

return(

<motion.div

whileHover={{
y:-8,
scale:1.04
}}

className="
rounded-2xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-5
"

>


<p className="
text-slate-400
">

{title}

</p>


<h3 className="
text-3xl
font-black
mt-2
">

{value}

</h3>


</motion.div>

);

}









function FeatureCard({
icon,
title,
text
}){


return(

<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

whileHover={{
y:-10,
scale:1.04
}}

className="
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-8
"

>


<div className="
text-cyan-400
text-4xl
">

{icon}

</div>



<h3 className="
text-xl
font-bold
mt-5
">

{title}

</h3>



<p className="
text-slate-400
mt-3
">

{text}

</p>



</motion.div>

);

}









function Journey({
number,
title,
text
}){


return(

<motion.div

whileHover={{
x:10
}}

className="
flex
gap-5
items-center
"

>


<div className="
h-12
w-12
rounded-xl
bg-cyan-500/20
text-cyan-400
flex
items-center
justify-center
font-bold
">

{number}

</div>




<div>


<h3 className="
text-xl
font-bold
">

{title}

</h3>



<p className="
text-slate-400
">

{text}

</p>



</div>


</motion.div>

);

}









function TechCard({
title,
value
}){


return(

<motion.div

whileHover={{
y:-8
}}

className="
rounded-2xl
bg-black/20
border
border-white/10
p-6
text-center
"

>


<h3 className="
font-bold
">

{title}

</h3>



<p className="
text-cyan-400
mt-2
">

{value}

</p>



</motion.div>

);

}