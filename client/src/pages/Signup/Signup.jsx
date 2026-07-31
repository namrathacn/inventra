import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import {
  FiArrowRight,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import GoogleButton from "../../components/auth/GoogleButton";


export default function Signup() {

const navigate = useNavigate();


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [businessPin,setBusinessPin]=useState("");
const [loading,setLoading]=useState(false);
const [googleLoading,setGoogleLoading]=useState(false);



const createUserProfile = async(user)=>{


const userRef = doc(
  db,
  "users",
  user.uid
);


const snap = await getDoc(userRef);



if(!snap.exists()){



const businessId =
"INV-" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();



const pin =
businessPin ||
Math.floor(
1000 + Math.random()*9000
).toString();




// CREATE BUSINESS
await setDoc(
doc(
db,
"businesses",
businessId
),
{

name:
(user.displayName || name) + "'s Store",

pin,

ownerId:
user.uid,

createdAt:
new Date()

}

);




// CREATE USER
await setDoc(
userRef,
{

uid:user.uid,

name:
user.displayName || name,

email:user.email,

role:"admin",

businessId,

createdAt:
new Date()

}

);



}


};




const signup = async(e)=>{

e.preventDefault();

setLoading(true);


try{


const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);



await createUserProfile({
uid:result.user.uid,
email,
displayName:name
});



toast.success(
"Admin account created"
);


navigate("/dashboard");


}
catch(error){

console.log(error);

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



await createUserProfile(
result.user
);



toast.success(
"Google signup successful"
);


navigate("/dashboard");


}
catch(error){

console.log(error);

toast.error(
"Google signup failed"
);

}


setGoogleLoading(false);


};





return (

<AuthLayout>

<AuthCard

title="Create Account"

subtitle="Create your Inventra business account."

>


<GoogleButton

onClick={googleSignup}

loading={googleLoading}

text="Continue with Google"

/>



<div className="
flex
items-center
gap-3
my-8
">

<div className="
flex-1
h-px
bg-white/10
"/>


<span className="
text-xs
tracking-widest
text-slate-500
">
OR
</span>


<div className="
flex-1
h-px
bg-white/10
"/>


</div>



<form

onSubmit={signup}

className="space-y-4"

>


<AuthInput

icon={<FiUser/>}

placeholder="Full Name"

value={name}

setValue={setName}

/>



<AuthInput

icon={<FiMail/>}

placeholder="Email Address"

value={email}

setValue={setEmail}

/>



<AuthInput

icon={<FiLock/>}

placeholder="Password"

type="password"

value={password}

setValue={setPassword}

/>
<AuthInput
icon={<FiLock/>}
placeholder="Business PIN"
value={businessPin}
setValue={setBusinessPin}
/>




<motion.button

whileHover={{
scale:1.015
}}

whileTap={{
scale:0.985
}}

disabled={loading}

className="
mt-3
w-full
rounded-2xl
bg-gradient-to-r
from-sky-500
to-blue-600
py-4
font-semibold
text-white
flex
items-center
justify-center
gap-3
"

>


{loading
?
"Creating Account..."
:
"Create Account"
}


<FiArrowRight/>


</motion.button>




<p className="
mt-8
text-center
text-sm
text-slate-400
">


Already have an account?


<Link

to="/login"

className="
ml-2
text-sky-400
font-semibold
"

>

Login

</Link>


</p>



</form>


</AuthCard>


</AuthLayout>


);

}