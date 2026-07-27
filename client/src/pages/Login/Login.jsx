import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";


import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";


import {
  auth
} from "../../firebase";


import {
  motion
} from "framer-motion";


import {
  FiMail,
  FiLock,
  FiChrome,
  FiArrowRight,
  FiStar
} from "react-icons/fi";


import toast from "react-hot-toast";






export default function Login(){


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);

const [googleLoading,setGoogleLoading]=useState(false);







const login = async(e)=>{


e.preventDefault();


setLoading(true);



try{


await signInWithEmailAndPassword(

auth,

email,

password

);



toast.success(
"Welcome back to Inventra"
);



navigate("/dashboard");



}

catch(error){


toast.error(
"Invalid login details"
);


}



setLoading(false);


};







const googleLogin = async()=>{


try{


setGoogleLoading(true);



const provider =
new GoogleAuthProvider();



await signInWithPopup(

auth,

provider

);



toast.success(
"Google login successful"
);



navigate("/dashboard");



}

catch(error){


toast.error(
"Google login failed"
);


}



setGoogleLoading(false);


};









return(


<div className="
min-h-screen
relative
overflow-hidden
flex
items-center
justify-center
bg-[#020617]
">






{/* MOVING GLOW BACKGROUND */}



<motion.div

animate={{

x:[0,140,0],

y:[0,-100,0]

}}

transition={{

duration:18,

repeat:Infinity

}}

className="
absolute
w-[650px]
h-[650px]
rounded-full
bg-cyan-500/30
blur-[170px]
top-[-250px]
left-[-250px]
"

/>






<motion.div

animate={{

x:[0,-150,0],

y:[0,120,0]

}}

transition={{

duration:20,

repeat:Infinity

}}

className="
absolute
w-[650px]
h-[650px]
rounded-full
bg-purple-600/30
blur-[170px]
bottom-[-250px]
right-[-250px]
"

/>







{/* FLOATING STARS */}



{
[1,2,3,4,5,6,7,8].map((item)=>(


<motion.div

key={item}

animate={{

y:[0,-40,0],

rotate:[0,180,360],

opacity:[0.3,1,0.3]

}}

transition={{

duration:
5+item,

repeat:Infinity

}}

className="
absolute
text-cyan-300/40
"

style={{

top:`${10*item}%`,

left:`${8*item}%`

}}

>

<FiStar/>

</motion.div>



))
}







{/* FLOATING GLASS BOXES */}




<motion.div

animate={{

y:[0,-80,0],

rotate:[0,45,0]

}}

transition={{

duration:10,

repeat:Infinity

}}

className="
absolute
w-20
h-20
rounded-2xl
bg-cyan-400/10
border
border-cyan-300/20
backdrop-blur-xl
top-20
right-32
"

/>






<motion.div

animate={{

y:[0,70,0],

rotate:[0,-45,0]

}}

transition={{

duration:12,

repeat:Infinity

}}

className="
absolute
w-28
h-28
rounded-3xl
bg-purple-500/10
border
border-purple-300/20
backdrop-blur-xl
bottom-20
left-24
"

/>
id="login-part2"
{/* LOGIN GLASS CARD */}


<motion.div

initial={{
opacity:0,
y:60,
scale:0.9
}}

animate={{
opacity:1,
y:0,
scale:1
}}

transition={{
duration:0.8,
ease:"easeOut"
}}


whileHover={{
scale:1.02
}}


className="
relative
z-10
w-full
max-w-md
rounded-3xl
p-8
bg-white/10
border
border-white/20
backdrop-blur-2xl
shadow-2xl
shadow-cyan-500/20
"

>



{/* CARD GLOW */}


<motion.div

animate={{
scale:[1,1.2,1],
opacity:[0.3,0.7,0.3]
}}

transition={{
duration:5,
repeat:Infinity
}}

className="
absolute
inset-0
rounded-3xl
bg-gradient-to-r
from-cyan-500/20
via-blue-500/20
to-purple-500/20
blur-xl
- z-10
"

/>





<div className="relative z-20">



<h1 className="
text-center
text-5xl
font-black
bg-gradient-to-r
from-cyan-400
via-blue-500
to-purple-500
bg-clip-text
text-transparent
">

Inventra

</h1>




<p className="
text-center
text-slate-300
mt-3
">

Smart Inventory Management

</p>







{/* GOOGLE BUTTON */}



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={googleLogin}

disabled={googleLoading}

className="
mt-8
w-full
py-3
rounded-xl
bg-gradient-to-r
from-cyan-500/20
via-blue-500/20
to-purple-500/20
border
border-cyan-400/30
text-white
font-bold
flex
items-center
justify-center
gap-3
backdrop-blur-xl
shadow-lg
shadow-cyan-500/20
"

>


<FiChrome
className="
text-cyan-300
text-xl
"
/>



{

googleLoading

?

"Connecting..."

:

"Continue with Google"

}



</motion.button>







<div className="
flex
items-center
gap-3
my-6
">


<div className="
flex-1
h-px
bg-white/20
"/>


<span className="
text-xs
text-slate-400
">

OR

</span>


<div className="
flex-1
h-px
bg-white/20
"/>


</div>








<form

onSubmit={login}

className="
space-y-5
"

>





<Input

icon={<FiMail/>}

placeholder="Email"

value={email}

setValue={setEmail}

/>





<Input

icon={<FiLock/>}

placeholder="Password"

type="password"

value={password}

setValue={setPassword}

/>







<motion.button

whileHover={{
scale:1.04
}}

whileTap={{
scale:0.95
}}

disabled={loading}

className="
w-full
py-4
rounded-xl
bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-600
font-bold
flex
justify-center
items-center
gap-3
shadow-xl
shadow-blue-500/30
"

>


{

loading

?

"Signing in..."

:

"Login"

}



<FiArrowRight/>


</motion.button>





</form>








<p className="
text-center
text-slate-300
mt-7
text-sm
">

Don't have an account?


<Link

to="/signup"

className="
text-cyan-400
font-bold
ml-2
hover:underline
"

>

Sign up

</Link>


</p>




</div>


</motion.div>




</div>


);

}








function Input({

icon,

placeholder,

value,

setValue,

type="text"

}){


return(

<div className="
flex
items-center
gap-3
bg-black/30
border
border-white/10
rounded-xl
px-4
focus-within:border-cyan-400
transition
">


<span className="
text-cyan-400
text-xl
">

{icon}

</span>



<input

type={type}

placeholder={placeholder}

value={value}

onChange={(e)=>setValue(e.target.value)}

className="
w-full
py-3
bg-transparent
outline-none
text-white
placeholder:text-slate-400
"

/>


</div>

)

}