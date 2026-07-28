import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";


import {
  FiCpu,
  FiTrendingUp,
  FiBox,
  FiActivity,
  FiCheckCircle
} from "react-icons/fi";



export default function InventraAI(){


const navigate = useNavigate();



const [active,setActive] = useState({});



const features = [


{
title:"Stock Prediction",
description:"Predict future inventory demand using sales trends.",
icon:<FiTrendingUp/>,
value:"Expected demand +18%",
recommendation:"Increase laptop and accessory stock"
},



{
title:"Smart Recommendations",
description:"Get suggestions for purchasing and stock management.",
icon:<FiBox/>,
value:"15 products optimized",
recommendation:"Restock fast moving products"
},



{
title:"AI Analytics",
description:"Analyze inventory performance and business patterns.",
icon:<FiActivity/>,
value:"Inventory efficiency 92%",
recommendation:"Reduce slow moving stock"
}



];





function toggleAI(title){

setActive({

...active,

[title]: !active[title]

});

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

<FiCpu/>

Inventra AI

</h1>



<p className="text-gray-400 mt-2">

AI powered inventory forecasting and intelligent recommendations.

</p>


</div>







<div className="
rounded-3xl
bg-[#111827]
border
border-white/10
p-8
">



<div className="flex justify-between items-center">


<div>

<h2 className="text-2xl font-semibold text-white">

AI Inventory Assistant

</h2>


<p className="text-gray-400 mt-2">

Analyze inventory data and generate smart business insights.

</p>


</div>




<div className="
px-4
py-2
rounded-xl
bg-cyan-500/20
text-cyan-300
text-sm
">

AI Ready

</div>


</div>








<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



{

features.map((item,index)=>(


<div

key={index}

onClick={()=>toggleAI(item.title)}

className="
cursor-pointer
p-6
rounded-2xl
bg-black/20
border
border-white/10
hover:border-cyan-400/40
transition
"



>




<div className="
text-cyan-400
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






<div className="
mt-5
p-4
rounded-xl
bg-white/5
">


<p className="text-cyan-300 text-sm">

{item.value}

</p>



<p className="text-gray-400 text-sm mt-2">

{item.recommendation}

</p>


</div>






<button

className="
mt-5
px-5
py-2
rounded-xl
bg-cyan-500/20
text-cyan-300
text-sm
"

>


{

active[item.title]

?

<>
<FiCheckCircle className="inline mr-2"/>
Enabled
</>

:

"Enable AI"

}


</button>





</div>


))


}



</div>




</div>




</div>


</DashboardLayout>


)

}