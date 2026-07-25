import {motion} from "framer-motion";


export default function ProfileCard(){


return(

<motion.div

whileHover={{
scale:1.03
}}

className="
rounded-3xl
border
border-white/10
bg-white/[0.06]
p-6
backdrop-blur-xl
"


>


<div className="
flex
items-center
gap-4
">


<motion.img

animate={{

scale:[1,1.05,1]

}}

transition={{

duration:3,

repeat:Infinity

}}

src="https://ui-avatars.com/api/?name=Namratha"

className="
h-16
w-16
rounded-full
"

/>



<div>


<h2 className="
font-bold
text-white
">

Namratha

</h2>


<p className="
text-sm
text-slate-400
">

Admin

</p>


</div>



</div>


</motion.div>


);

}