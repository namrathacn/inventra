import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiPackage,
  FiShoppingCart,
  FiBarChart,
  FiActivity,
  FiCheckCircle
} from "react-icons/fi";


import { motion } from "framer-motion";


import DashboardLayout from "../../layouts/DashboardLayout";


import { useAuth } from "../../context/AuthContext";





export default function Profile(){



const { user } = useAuth();




const username =
user?.displayName ||
user?.email?.split("@")[0] ||
"Inventra User";





return(


<DashboardLayout>



<div className="space-y-8">







{/* PROFILE HEADER */}



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
duration:.5
}}

className="
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
"


>


<div className="
absolute
right-0
top-0
h-48
w-48
rounded-full
bg-cyan-500/20
blur-3xl
"
/>



<div className="
flex
flex-col
md:flex-row
items-center
gap-8
relative
">







{/* AVATAR */}



<div className="
h-32
w-32
rounded-full
bg-gradient-to-br
from-cyan-400
to-blue-600
p-1
">


<div className="
h-full
w-full
rounded-full
bg-[#07111f]
flex
items-center
justify-center
overflow-hidden
">


{

user?.photoURL ?


<img

src={user.photoURL}

alt="Profile"

className="
h-full
w-full
object-cover
"

/>


:


<FiUser

className="
text-6xl
text-cyan-400
"

/>


}



</div>


</div>









<div className="flex-1">


<h1 className="
text-4xl
font-bold
text-white
">

{username}

</h1>




<p className="
text-slate-400
mt-3
flex
items-center
gap-2
">


<FiMail/>


{user?.email || "No email"}


</p>





<div className="
flex
gap-3
mt-5
">


<span className="
flex
items-center
gap-2
rounded-full
bg-green-500/20
px-4
py-2
text-green-400
text-sm
">

<FiCheckCircle/>

Active Account

</span>




<span className="
rounded-full
bg-cyan-500/20
px-4
py-2
text-cyan-400
text-sm
">

Administrator

</span>



</div>



</div>







</div>


</motion.div>









{/* DETAILS */}



<div className="
grid
md:grid-cols-3
gap-6
">





<InfoCard

icon={<FiMail/>}

title="Email"

value={user?.email || "Not Available"}

/>





<InfoCard

icon={<FiShield/>}

title="Security"

value="Firebase Verified"

/>





<InfoCard

icon={<FiCalendar/>}

title="Joined"

value={
user?.metadata?.creationTime ||
"Recently"
}

/>





</div>









{/* STATISTICS */}



<div className="
grid
md:grid-cols-3
gap-6
">



<StatCard

icon={<FiPackage/>}

title="Products Managed"

value="421"

/>





<StatCard

icon={<FiShoppingCart/>}

title="Orders Completed"

value="267"

/>





<StatCard

icon={<FiBarChart/>}

title="Reports Generated"

value="18"

/>





</div>









{/* ACTIVITY */}



<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
"

>


<div className="
flex
items-center
gap-3
mb-6
">


<FiActivity

className="
text-cyan-400
text-3xl
"

/>


<h2 className="
text-2xl
font-bold
text-white
">

Account Activity

</h2>


</div>






<div className="
grid
md:grid-cols-3
gap-5
">



<ActivityCard

title="Login"

value="Active Now"

/>



<ActivityCard

title="Account"

value="Secure"

/>



<ActivityCard

title="Role"

value="Admin"

/>



</div>



</motion.div>








</div>


</DashboardLayout>


)

}









function InfoCard({icon,title,value}){


return(


<motion.div

whileHover={{
y:-5
}}

className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
"


>


<div className="
text-cyan-400
text-3xl
">

{icon}

</div>



<p className="
text-slate-400
mt-4
">

{title}

</p>



<h3 className="
text-white
font-bold
mt-2
truncate
">

{value}

</h3>


</motion.div>


)

}









function StatCard({icon,title,value}){


return(


<motion.div

whileHover={{
scale:1.03
}}

className="
rounded-3xl
border
border-white/10
bg-gradient-to-br
from-white/10
to-white/5
backdrop-blur-xl
p-6
"


>


<div className="
text-cyan-400
text-4xl
">

{icon}

</div>



<p className="
text-slate-400
mt-4
">

{title}

</p>



<h2 className="
text-white
text-4xl
font-bold
mt-2
">

{value}

</h2>



</motion.div>


)

}









function ActivityCard({title,value}){


return(


<div className="
rounded-2xl
bg-black/20
border
border-white/10
p-5
">


<p className="
text-slate-400
">

{title}

</p>


<h3 className="
text-white
font-bold
text-xl
mt-2
">

{value}

</h3>


</div>


)


}