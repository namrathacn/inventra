import {motion} from "framer-motion";


export default function StatCard({

title,
value,
change,
color,
icon,
format

}){


return(


<motion.div


initial={{
opacity:0,
y:25
}}


animate={{
opacity:1,
y:0
}}


whileHover={{

y:-8,

scale:1.02

}}


transition={{
duration:.45
}}



className="
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/[0.07]
backdrop-blur-2xl
p-6
shadow-xl
"

>


{/* Background Glow */}


<div

className="
absolute
-right-10
-top-10
h-36
w-36
rounded-full
blur-3xl
opacity-30
"

style={{

background:color

}}

/>





{/* Top */}


<div className="
relative
flex
items-start
justify-between
">



<div>


<p className="
text-sm
font-medium
text-slate-400
">

{title}

</p>





<h2 className="
mt-3
text-4xl
font-bold
tracking-tight
text-white
">

{

format
?
format(value)
:
value

}

</h2>





<div className="
mt-4
flex
items-center
gap-2
"
>


<span

className="
rounded-full
bg-green-500/20
px-3
py-1
text-xs
font-semibold
text-green-400
"

>

↑ {change}

</span>



</div>



</div>









{/* ICON */}


<motion.div


animate={{

x:[0,5,0],

y:[0,-5,0]

}}


transition={{

duration:2.5,

repeat:Infinity,

ease:"easeInOut"

}}



className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
text-3xl
text-white
shadow-2xl
"

style={{

background:

`linear-gradient(135deg,${color},rgba(255,255,255,.15))`

}}



>


{icon}


</motion.div>






</div>






{/* Bottom line */}


<div

className="
absolute
bottom-0
left-0
h-1
w-full
opacity-60
"

style={{

background:

`linear-gradient(90deg,transparent,${color},transparent)`

}}


/>



</motion.div>


)

}