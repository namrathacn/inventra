import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";


import {
  FiBell,
  FiMail,
  FiAlertTriangle,
  FiCheckCircle
} from "react-icons/fi";



export default function Notifications(){


const navigate = useNavigate();



const [status,setStatus] = useState({});

const {user} = useAuth();



const notifications = [


{
title:"Low Stock Alerts",
description:"Get notified when products reach minimum stock levels.",
icon:<FiAlertTriangle/>
},



{
title:"Sales Reports",
description:"Receive daily and weekly sales performance updates.",
icon:<FiMail/>
},



{
title:"Inventory Updates",
description:"Stay updated about product changes and activities.",
icon:<FiCheckCircle/>
}


];

useEffect(()=>{

if(!user) return;

loadNotifications();

},[user]);


async function loadNotifications(){

const snap = await getDoc(
  doc(db,"notificationSettings",user.uid)
);


if(snap.exists()){

setStatus(
  snap.data()
);

}

}


async function toggleNotification(title){

const updated = {

...status,

[title]: !status[title]

};


setStatus(updated);


await setDoc(
  doc(db,"notificationSettings",user.uid),
  updated
);


}









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

<FiBell/>

Notifications

</h1>



<p className="text-gray-400 mt-2">

Manage alerts and updates for your Inventra workspace.

</p>


</div>








<div className="
grid
md:grid-cols-3
gap-6
">



{

notifications.map((item,index)=>(


<div

key={index}

className="
rounded-3xl
bg-[#111827]
border
border-white/10
p-6
hover:border-cyan-400/40
transition
"


>




<div className="
w-14
h-14
rounded-2xl
bg-gradient-to-br
from-green-400
to-emerald-600
flex
items-center
justify-center
text-white
text-2xl
mb-5
">

{item.icon}

</div>





<h2 className="text-xl font-semibold text-white">

{item.title}

</h2>




<p className="text-gray-400 mt-2 text-sm">

{item.description}

</p>





<div className="flex items-center justify-between mt-6">


<span className="text-gray-300 text-sm">

{

status[item.title]

?

"Enabled"

:

"Disabled"

}

</span>




<button

onClick={()=>toggleNotification(item.title)}

className={`
w-14
h-7
rounded-full
transition
relative
${
status[item.title]

?

"bg-cyan-500"

:

"bg-gray-600"
}

`}

>


<div

className={`
absolute
top-1
w-5
h-5
rounded-full
bg-white
transition-all
${
status[item.title]

?

"left-8"

:

"left-1"
}

`}

/>


</button>



</div>




</div>


))


}



</div>




</div>


</DashboardLayout>


)


}