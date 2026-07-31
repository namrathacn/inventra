import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import toast from "react-hot-toast";


export default function StaffSignup(){

const navigate = useNavigate();


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [pin,setPin]=useState("");

const [loading,setLoading]=useState(false);



const signup = async(e)=>{

e.preventDefault();

setLoading(true);


try{


const q = query(
collection(db,"businesses"),
where(
"pin",
"==",
pin
)
);


const snap = await getDocs(q);



if(snap.empty){

toast.error(
"Invalid Business PIN"
);

setLoading(false);

return;

}



const businessDoc =
snap.docs[0];


const businessId =
businessDoc.id;



const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);



await setDoc(
doc(
db,
"users",
result.user.uid
),
{

uid:
result.user.uid,

name,

email,

role:
"staff",

businessId,

createdAt:
new Date()

}

);



toast.success(
"Staff account created"
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



return(

<div className="
min-h-screen
bg-slate-950
flex
items-center
justify-center
">


<form
onSubmit={signup}
className="
w-full
max-w-md
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-8
space-y-4
"
>


<h1 className="
text-3xl
font-bold
text-white
">
Staff Signup
</h1>



<input
className="
w-full
bg-white/10
rounded-xl
p-3
text-white
"
placeholder="Name"
value={name}
onChange={
e=>setName(e.target.value)
}
/>



<input
className="
w-full
bg-white/10
rounded-xl
p-3
text-white
"
placeholder="Email"
value={email}
onChange={
e=>setEmail(e.target.value)
}
/>



<input
className="
w-full
bg-white/10
rounded-xl
p-3
text-white
"
placeholder="Password"
type="password"
value={password}
onChange={
e=>setPassword(e.target.value)
}
/>



<input
className="
w-full
bg-white/10
rounded-xl
p-3
text-white
"
placeholder="Business PIN"
value={pin}
onChange={
e=>setPin(e.target.value)
}
/>



<button
disabled={loading}
className="
w-full
bg-cyan-500
rounded-xl
py-3
text-white
font-semibold
"
>

{
loading
?
"Creating..."
:
"Create Staff Account"
}

</button>



</form>


</div>

);


}