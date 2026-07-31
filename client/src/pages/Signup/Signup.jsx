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
FiBriefcase
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



const q =
query(

collection(db,"businesses"),

where(
"pin",
"==",
pin
)

);



const snap =
await getDocs(q);



if(snap.empty){

throw new Error(
"Invalid Business PIN"
);

}




const business =
snap.docs[0];




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
business.id,


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


const businessRef =
await addDoc(

collection(
db,
"businesses"
),

{


businessName,


pin,


ownerId:
user.uid,


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
businessRef.id,


createdAt:
serverTimestamp()


}

);



toast.success(
"Business created successfully"
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


const provider =
new GoogleAuthProvider();



const result =
await signInWithPopup(
auth,
provider
);



const user =
result.user;



if(!joinMode){


const businessRef =
await addDoc(

collection(db,"businesses"),

{


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

name:user.displayName,

email:user.email,

role:"admin",

businessId:
businessRef.id

}

);


}



toast.success(
"Signup successful"
);


navigate("/dashboard");


}
catch(error){

console.log(error);

toast.error(
error.message
);


}



}








return(

<AuthLayout>


<AuthCard

title="Create Account"

subtitle={
joinMode
?
"Join your business workspace"
:
"Create your Inventra business"
}

>




<GoogleButton

onClick={googleSignup}

text="Continue with Google"

/>






<div className="space-y-4 mt-8">





<AuthInput

icon={<FiUser/>}

placeholder="Full Name"

value={name}

setValue={setName}

/>






<AuthInput

icon={<FiMail/>}

placeholder="Email"

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







{

!joinMode &&

<AuthInput

icon={<FiBriefcase/>}

placeholder="Business Name"

value={businessName}

setValue={setBusinessName}

/>

}







<AuthInput

icon={<FiLock/>}

placeholder={
joinMode
?
"Business PIN"
:
"Create Business PIN"
}

value={pin}

setValue={setPin}

/>







<motion.button

whileHover={{
scale:1.02
}}

disabled={loading}

onClick={createAccount}

className="
w-full
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
py-4
text-white
font-semibold
flex
justify-center
gap-3
"

>


{
loading
?
"Creating..."
:
joinMode
?
"Join Business"
:
"Create Business"
}



<FiArrowRight/>


</motion.button>







<button

type="button"

onClick={()=>setJoinMode(!joinMode)}

className="
text-cyan-400
text-sm
mt-5
"

>


{

joinMode

?

"Create your own business instead"

:

"Have a Business PIN? Join as Staff"

}



</button>





<p className="text-center text-slate-400 mt-5">

Already have account?

<Link
to="/login"
className="text-cyan-400 ml-2"
>
Login
</Link>


</p>



</div>


</AuthCard>


</AuthLayout>


);


}