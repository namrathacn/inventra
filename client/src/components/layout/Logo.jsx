import { motion } from "framer-motion";
import { FiBox, FiActivity } from "react-icons/fi";


export default function Logo(){

return(

<motion.div

initial={{
opacity:0,
scale:.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.7
}}

className="
flex
items-center
gap-4
"


>


{/* logo box */}

<motion.div


whileHover={{
rotate:10,
scale:1.1
}}


animate={{

boxShadow:[
"0 0 20px rgba(34,211,238,.3)",
"0 0 50px rgba(34,211,238,.7)",
"0 0 20px rgba(34,211,238,.3)"
]

}}


transition={{

duration:3,
repeat:Infinity

}}


className="

relative
flex
h-14
w-14
items-center
justify-center
overflow-hidden
rounded-2xl
border
border-cyan-300/20
bg-gradient-to-br
from-cyan-400
via-blue-500
to-purple-600
shadow-xl

"


>



{/* rotating ring */}

<motion.div

animate={{

rotate:360

}}

transition={{

duration:8,
repeat:Infinity,
ease:"linear"

}}

className="

absolute
h-20
w-20
rounded-full
border
border-white/30

"

/>



<FiBox

className="
relative
z-10
text-3xl
text-white
"

/>



{/* small pulse */}

<motion.span

animate={{

scale:[1,1.5,1],
opacity:[.5,1,.5]

}}

transition={{

duration:2,
repeat:Infinity

}}

className="

absolute
bottom-2
right-2
h-2
w-2
rounded-full
bg-white

"

/>



</motion.div>







<div>


<motion.h1

animate={{

backgroundPosition:[
"0%",
"100%",
"0%"
]

}}

transition={{

duration:5,
repeat:Infinity

}}

className="

bg-gradient-to-r
from-cyan-300
via-white
to-purple-300
bg-[length:200%]
bg-clip-text
text-2xl
font-extrabold
tracking-tight
text-transparent

"

>

Inventra

</motion.h1>




<div className="
mt-1
flex
items-center
gap-2
text-xs
tracking-widest
text-slate-400
uppercase
">


<FiActivity className="text-cyan-400"/>


Inventory AI


</div>



</div>



</motion.div>


)

}