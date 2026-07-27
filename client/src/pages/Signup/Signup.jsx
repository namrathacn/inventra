import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";


import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";


import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";


import {
  auth,
  db
} from "../../firebase";


import {
  motion
} from "framer-motion";


import {
  FiUser,
  FiMail,
  FiLock,
  FiChrome,
  FiArrowRight,
  FiStar
} from "react-icons/fi";


import toast from "react-hot-toast";







export default function Signup(){



const navigate = useNavigate();



const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [googleLoading,setGoogleLoading] = useState(false);







const signup = async(e)=>{


e.preventDefault();


setLoading(true);



try{


const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);





await setDoc(

doc(

db,

"users",

userCredential.user.uid

),

{

name,

email,

role:"staff"

}

);




toast.success(
"Account created successfully"
);



navigate("/dashboard");



}

catch(error){


toast.error(
"Signup failed"
);


}



setLoading(false);


};









const googleSignup = async()=>{


try{


setGoogleLoading(true);



const provider =
new GoogleAuthProvider();



const result =

await signInWithPopup(

auth,

provider

);





const userRef =

doc(

db,

"users",

result.user.uid

);





const userSnap =

await getDoc(userRef);





if(!userSnap.exists()){


await setDoc(

userRef,

{

name:
result.user.displayName || "User",

email:
result.user.email,

role:"staff"

}

);


}




toast.success(
"Google signup successful"
);



navigate("/dashboard");



}

catch(error){


toast.error(
"Google signup failed"
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






{/* MOVING LIGHT BACKGROUND */}





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

duration:5+item,

repeat:Infinity

}}

style={{

top:`${item*10}%`,

left:`${item*9}%`

}}

className="
absolute
text-purple-300/40
"


>

<FiStar/>


</motion.div>


))
}







{/* FLOATING GLASS SQUARES */}


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
w-24
h-24
rounded-3xl
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
w-32
h-32
rounded-3xl
bg-purple-500/10
border
border-purple-300/20
backdrop-blur-xl
bottom-20
left-24
"

/>
{/* SIGNUP GLASS CARD */}


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
shadow-purple-500/20
"

>





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
"

/>







<div className="
relative
z-20
">





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

Create your smart inventory account

</p>








{/* GOOGLE SIGNUP */}



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={googleSignup}

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
shadow-purple-500/20
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
h-px
bg-white/20
flex-1
"/>


<span className="
text-xs
text-slate-400
">

OR

</span>


<div className="
h-px
bg-white/20
flex-1
"/>


</div>








<form

onSubmit={signup}

className="
space-y-5
"

>






<Input

icon={<FiUser/>}

placeholder="Full Name"

value={name}

setValue={setName}

/>






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
items-center
justify-center
gap-3
shadow-xl
shadow-cyan-500/30
"

>


{

loading

?

"Creating Account..."

:

"Create Account"

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

Already have an account?


<Link

to="/login"

className="
text-cyan-400
font-bold
ml-2
hover:underline
"

>

Login

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