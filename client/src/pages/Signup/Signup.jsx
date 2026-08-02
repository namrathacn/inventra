import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
createUserWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup
} from "firebase/auth";


import {
doc,
setDoc,
addDoc,
collection,
query,
where,
getDocs,
serverTimestamp
} from "firebase/firestore";


import {
auth,
db
} from "../../firebase";


import {
FiArrowRight,
FiLock,
FiMail,
FiUser,
FiBriefcase,
FiUsers,
FiShield
} from "react-icons/fi";


import {motion} from "framer-motion";

import toast from "react-hot-toast";


import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import GoogleButton from "../../components/auth/GoogleButton";




export default function Signup(){


const navigate = useNavigate();



const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [businessName,setBusinessName]=useState("");

const [businessId,setBusinessId]=useState("");

const [pin,setPin]=useState("");

const [joinMode,setJoinMode]=useState(false);


const [loading,setLoading]=useState(false);






async function createAccount(e){


e.preventDefault();


setLoading(true);



try{


const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);



const user =
result.user;



// ==========================
// STAFF JOIN
// ==========================


if(joinMode){



const q = query(
collection(db,"businesses"),
where("businessId","==",businessId),
where("businessName","==",businessName),
where("pin","==",pin)
);

const snap = await getDocs(q);

if(snap.empty){

throw new Error(
"Invalid Business ID or PIN"
);

}

const business = snap.docs[0];


await setDoc(

doc(
db,
"users",
user.uid
),

{


uid:user.uid,


name,


email,


role:"staff",


businessId:
business.data().businessId,


createdAt:
serverTimestamp()


}

);



toast.success(
"Joined business successfully"
);



}




// ==========================
// CREATE BUSINESS
// ==========================


else{


const generatedBusinessId =
"INV-" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

const businessRef =
await addDoc(
collection(db,"businesses"),
{

businessId:
generatedBusinessId,

businessName,

pin,

ownerId:user.uid,

createdAt:
serverTimestamp()

}
);




await setDoc(

doc(
db,
"users",
user.uid
),

{


uid:user.uid,


name,


email,


role:"admin",


businessId:
generatedBusinessId,


createdAt:
serverTimestamp()


}

);



toast.success(
`Business created!

Business ID: ${generatedBusinessId}

Share this Business ID and PIN with your staff.`
);


}




navigate("/dashboard");



}
catch(error){


console.log(error);


toast.error(
error.message
);


}


setLoading(false);


}









// GOOGLE SIGNUP


async function googleSignup(){

try{

if(!businessName){

toast.error("Enter Business Name");

return;

}

if(!pin){

toast.error("Enter Business PIN");

return;

}

const provider = new GoogleAuthProvider();

const result = await signInWithPopup(
auth,
provider
);

const user = result.user;


// ================= JOIN BUSINESS =================

if(joinMode){

const q = query(

collection(db,"businesses"),

where("businessId","==",businessId),

where("businessName","==",businessName),

where("pin","==",pin)

);

const snap = await getDocs(q);

if(snap.empty){

toast.error(
"Invalid Business Details"
);

return;

}

const business = snap.docs[0];

await setDoc(

doc(db,"users",user.uid),

{

uid:user.uid,

name:user.displayName,

email:user.email,

role:"staff",

businessId:business.data().businessId,

createdAt:serverTimestamp()

}

);

toast.success("Joined Business");

}


// ================= CREATE BUSINESS =================

else{

const generatedBusinessId =
"INV-" +
Math.random()
.toString(36)
.substring(2,8)
.toUpperCase();

await addDoc(

collection(db,"businesses"),

{

businessId:generatedBusinessId,

businessName,

pin,

ownerId:user.uid,

createdAt:serverTimestamp()

}

);

await setDoc(

doc(db,"users",user.uid),

{

uid:user.uid,

name:user.displayName,

email:user.email,

role:"admin",

businessId:generatedBusinessId,

createdAt:serverTimestamp()

}

);

toast.success(
`Business Created

Business ID : ${generatedBusinessId}`
);

}

navigate("/dashboard");

}
catch(error){

console.log(error);

toast.error(error.message);

}

}








return (

<AuthLayout>

<AuthCard
title={joinMode ? "Join Business" : "Create Business"}
subtitle={
joinMode
? "Join your team's workspace."
: "Create your own inventory workspace."
}
>

<div className="grid grid-cols-2 gap-4 mb-8">

<motion.div
whileHover={{ y: -3 }}
whileTap={{ scale: 0.98 }}
onClick={() => setJoinMode(false)}
className={`
cursor-pointer
rounded-3xl
border
backdrop-blur-2xl
p-6
transition-all
duration-300
${
!joinMode
? "border-cyan-400/40 bg-cyan-500/10 shadow-xl shadow-cyan-500/20"
: "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
}
`}
>

<div
className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-cyan-500
to-blue-600
flex
items-center
justify-center
text-white
mb-5
"
>

<FiShield className="text-2xl"/>

</div>

<h2 className="text-lg font-bold text-white">
Create Business
</h2>

<p className="mt-2 text-sm text-slate-400 leading-6">
Create your own workspace and become the administrator.
</p>

</motion.div>

<motion.div
whileHover={{ y: -3 }}
whileTap={{ scale: 0.98 }}
onClick={() => setJoinMode(true)}
className={`
cursor-pointer
rounded-3xl
border
backdrop-blur-2xl
p-6
transition-all
duration-300
${
joinMode
? "border-cyan-400/40 bg-cyan-500/10 shadow-xl shadow-cyan-500/20"
: "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
}
`}
>

<div
className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-violet-500
to-purple-600
flex
items-center
justify-center
text-white
mb-5
"
>

<FiUsers className="text-2xl"/>

</div>

<h2 className="text-lg font-bold text-white">
Join Business
</h2>

<p className="mt-2 text-sm text-slate-400 leading-6">
Join an existing workspace using the Business Name and PIN.
</p>

</motion.div>

</div>

<GoogleButton
onClick={googleSignup}
text="Continue with Google"
/>

<div className="flex items-center gap-4 my-7">

<div className="h-px flex-1 bg-white/10"/>

<p className="text-xs text-slate-500 tracking-[0.35em]">
OR
</p>

<div className="h-px flex-1 bg-white/10"/>

</div>

<form
onSubmit={createAccount}
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
{joinMode && (

<AuthInput
icon={<FiBriefcase/>}
placeholder="Business ID (Example: INV-A1B2C3)"
value={businessId}
setValue={setBusinessId}
/>

)}
<AuthInput
icon={<FiLock/>}
placeholder="Password"
type="password"
value={password}
setValue={setPassword}
/>

<AuthInput
icon={<FiBriefcase/>}
placeholder="Business Name (Example: Super Market)"
value={businessName}
setValue={setBusinessName}
/>

<AuthInput
icon={<FiLock/>}
placeholder={
joinMode
?
"Business PIN (Example: 1234)"
:
"Create Business PIN"
}
value={pin}
setValue={setPin}
/>

<div className="
rounded-2xl
border
border-cyan-400/20
bg-cyan-500/10
backdrop-blur-xl
p-4
">

<p className="text-xs text-cyan-300 leading-6">

{joinMode
?
"Enter the exact Business ID, Business Name and PIN shared by your Administrator."
:
"Share this Business Name and PIN only with your staff members."}

</p>

</div>

<motion.button
whileHover={{scale:1.02}}
whileTap={{scale:0.98}}
disabled={loading}
className="
w-full
rounded-2xl
bg-gradient-to-r
from-cyan-500
via-blue-500
to-indigo-600
py-4
font-semibold
text-white
shadow-xl
shadow-cyan-500/30
flex
items-center
justify-center
gap-3
"
>

{
loading
?
"Please wait..."
:
joinMode
?
"Join Business"
:
"Create Business"
}

<FiArrowRight/>

</motion.button>

<p className="
text-center
text-slate-400
text-sm
pt-2
">

Already have an account?

<Link
to="/login"
className="text-cyan-400 ml-2 font-semibold"
>

Login

</Link>

</p>

</form>

</AuthCard>

</AuthLayout>

);


}