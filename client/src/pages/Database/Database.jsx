import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";


import {
  FiDatabase,
  FiHardDrive,
  FiDownload,
  FiServer,
  FiCheckCircle
} from "react-icons/fi";



export default function Database(){


const navigate = useNavigate();


const [backup,setBackup] = useState(false);



const stats=[

{
title:"Products",
value:"245",
description:"Total inventory items",
icon:<FiDatabase/>
},


{
title:"Orders",
value:"580",
description:"Total customer orders",
icon:<FiServer/>
},


{
title:"Sales Records",
value:"1200",
description:"Stored transactions",
icon:<FiHardDrive/>
}

];





function createBackup(){

setBackup(true);


setTimeout(()=>{

setBackup(false);

},3000);


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

<FiDatabase/>

Database

</h1>



<p className="text-gray-400 mt-2">

Manage Inventra data storage, backups and database operations.

</p>


</div>








<div className="
rounded-3xl
bg-[#111827]
border
border-white/10
p-8
">





<div className="
flex
justify-between
items-center
flex-wrap
gap-5
">



<div>


<h2 className="text-2xl font-semibold text-white">

Inventory Database

</h2>



<p className="text-gray-400 mt-2">

Monitor your database connection and stored business data.

</p>


</div>





<div className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-green-500/20
text-green-400
text-sm
">


<FiCheckCircle/>

Connected


</div>



</div>









<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



{

stats.map((item,index)=>(


<div

key={index}

className="
rounded-2xl
bg-black/20
border
border-white/10
p-6
hover:border-cyan-400/30
transition
"


>


<div className="
text-orange-400
text-3xl
mb-5
">

{item.icon}

</div>




<h3 className="text-white font-semibold">

{item.title}

</h3>




<p className="
text-3xl
font-bold
text-white
mt-3
">

{item.value}

</p>




<p className="text-gray-400 text-sm mt-2">

{item.description}

</p>




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

Storage Usage

</h3>


<p className="text-gray-400 mt-2">

Database storage consumption.

</p>




<div className="
mt-5
w-full
h-3
rounded-full
bg-gray-700
">


<div

className="
h-3
rounded-full
bg-cyan-500
w-[65%]
"

/>


</div>



<p className="text-cyan-400 mt-3 text-sm">

65% Used

</p>



</div>









<div className="
p-6
rounded-2xl
bg-black/20
border
border-white/10
">


<h3 className="text-white text-xl font-semibold">

Backup Management

</h3>



<p className="text-gray-400 mt-2">

Create a secure copy of your inventory data.

</p>





<button

onClick={createBackup}

className="
mt-5
flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-orange-500/20
text-orange-300
hover:bg-orange-500/30
"

>


<FiDownload/>


{

backup

?

"Backup Completed ✓"

:

"Create Backup"

}


</button>



</div>






</div>





</div>





</div>


</DashboardLayout>


)


}