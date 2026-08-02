import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";


import {
  FiShield,
  FiLock,
  FiUserCheck,
  FiActivity,
  FiCheckCircle
} from "react-icons/fi";



export default function Security(){


const navigate = useNavigate();


const [twoFactor,setTwoFactor] = useState(false);


const [passwordChanged,setPasswordChanged] = useState(false);
const [newPassword, setNewPassword] = useState("");
async function changePassword() {

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {

    await updatePassword(
      auth.currentUser,
      newPassword
    );

    setPasswordChanged(true);
    setNewPassword("");

  } catch(err){

    alert(err.message);

  }

}

const securityOptions=[


{
title:"Password Management",
description:"Update password and maintain account safety.",
icon:<FiLock/>
},



{
title:"Access Permissions",
description:"Manage user roles and account access.",
icon:<FiUserCheck/>
},



{
title:"Login Activity",
description:"Review recent account activities.",
icon:<FiActivity/>
}


];





return(


<DashboardLayout>


<div className="space-y-8">





<button

onClick={()=>navigate("/settings")}

className="
flex
items-center
gap-2
text-cyan-400
hover:text-cyan-300
transition
"

>

← Back to Settings

</button>






<div>


<h1 className="
text-3xl
font-bold
text-white
flex
items-center
gap-3
">


<FiShield/>

Security


</h1>




<p className="text-gray-400 mt-2">

Protect your Inventra account and manage security controls.

</p>



</div>









<div className="
rounded-3xl
bg-[#111827]
border
border-white/10
p-8
">





<div className="flex items-center justify-between">


<div>


<h2 className="text-2xl font-semibold text-white">

Account Protection

</h2>


<p className="text-gray-400 mt-2">

Manage authentication and account security settings.

</p>
<input

type="password"

placeholder="Enter new password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="
mt-5
w-full
max-w-md
bg-white/10
border
border-white/10
rounded-xl
p-3
text-white
outline-none
"

/>


</div>




<div className="
px-4
py-2
rounded-xl
bg-green-500/20
text-green-400
flex
items-center
gap-2
text-sm
">

<FiCheckCircle/>

Secure


</div>


</div>









<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



{

securityOptions.map((item,index)=>(


<div

key={index}

className="
p-6
rounded-2xl
bg-black/20
border
border-white/10
hover:border-red-400/40
transition
"


>


<div className="
text-red-400
text-3xl
mb-5
">

{item.icon}

</div>




<h3 className="text-white font-semibold text-lg">

{item.title}

</h3>




<p className="text-gray-400 text-sm mt-2">

{item.description}

</p>






<button

onClick={changePassword}


className="
mt-5
px-5
py-2
rounded-xl
bg-red-500/20
text-red-300
hover:bg-red-500/30
"

>


{

item.title==="Password Management" && passwordChanged

?

"Password Updated ✓"

:

"Configure"

}



</button>




</div>


))


}



</div>









<div className="
mt-8
grid
md:grid-cols-2
gap-6
">





<div className="
p-6
rounded-2xl
bg-black/20
border
border-white/10
">


<h3 className="text-white text-xl font-semibold">

Two Factor Authentication

</h3>


<p className="text-gray-400 mt-2">

Add an extra layer of protection to your account.

</p>






<button

onClick={()=>setTwoFactor(!twoFactor)}

className={`
mt-5
px-5
py-3
rounded-xl
text-sm
transition
${
twoFactor

?

"bg-green-500/20 text-green-300"

:

"bg-white/10 text-white"

}
`}

>


{

twoFactor

?

"2FA Enabled ✓"

:

"Enable 2FA"

}


</button>



</div>









<div className="
p-6
rounded-2xl
bg-black/20
border
border-white/10
">


<h3 className="text-white text-xl font-semibold">

Active Sessions

</h3>



<div className="
mt-5
space-y-3
">



<div className="
p-4
rounded-xl
bg-white/5
text-gray-300
">

Chrome Browser

<p className="text-gray-500 text-sm">

Current session

</p>

</div>





<div className="
p-4
rounded-xl
bg-white/5
text-gray-300
">

Windows Device

<p className="text-gray-500 text-sm">

Last active today

</p>

</div>




</div>



</div>







</div>








<div className="
mt-6
p-6
rounded-2xl
bg-black/20
border
border-white/10
">


<h3 className="text-white text-xl font-semibold">

Login Activity

</h3>



<p className="text-gray-400 mt-3">

Last login:
Today, 9:30 AM

</p>


<p className="text-gray-400 mt-2">

Location:
Bengaluru

</p>


</div>







</div>






</div>


</DashboardLayout>


)


}