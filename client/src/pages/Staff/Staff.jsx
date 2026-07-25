import DashboardLayout from "../../layouts/DashboardLayout";

import {
FiUsers,
FiMail,
FiPhone,
FiEdit2,
FiTrash2,
FiPlus,
FiX
} from "react-icons/fi";


import {useState} from "react";

import {useSearch} from "../../context/SearchContext";




export default function Staff(){



const {search}=useSearch();





const [staff,setStaff]=useState([


{
id:1,
name:"Rahul Sharma",
role:"Manager",
email:"rahul@gmail.com",
phone:"9876543210"
},


{
id:2,
name:"Ananya Rao",
role:"Sales Executive",
email:"ananya@gmail.com",
phone:"9876543211"
}


]);







const [showModal,setShowModal]=useState(false);


const [editStaff,setEditStaff]=useState(null);





const [form,setForm]=useState({

name:"",
role:"",
email:"",
phone:""

});









function openAdd(){


setEditStaff(null);


setForm({

name:"",
role:"",
email:"",
phone:""

});


setShowModal(true);


}








function openEdit(person){


setEditStaff(person);


setForm(person);


setShowModal(true);


}









function saveStaff(e){


e.preventDefault();



if(
!form.name ||
!form.role ||
!form.email ||
!form.phone
)

return;





if(editStaff){


setStaff(

staff.map(item=>

item.id===editStaff.id

?

{

...form,

id:item.id

}

:

item

)

);


}

else{


setStaff([

...staff,

{

...form,

id:Date.now()

}

]);


}



setShowModal(false);


}









function deleteStaff(id){


setStaff(

staff.filter(

item=>item.id!==id

)

);


}









const filteredStaff = staff.filter(person=>

person.name
.toLowerCase()
.includes(search.toLowerCase())


||

person.role
.toLowerCase()
.includes(search.toLowerCase())


);










return(


<DashboardLayout>


<div className="space-y-8">







<div className="
rounded-3xl
bg-white/5
border
border-white/10
p-8
flex
justify-between
items-center
">


<div>


<h1 className="
text-3xl
font-bold
text-white
">

Staff Management

</h1>


<p className="
text-slate-400
">

Manage employees and roles

</p>


</div>






<button

onClick={openAdd}

className="
bg-cyan-500
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
">


<FiPlus/>

Add Staff


</button>



</div>









<div className="
grid
md:grid-cols-2
gap-6
">



{


filteredStaff.map(person=>(



<div

key={person.id}

className="
rounded-3xl
bg-white/5
border
border-white/10
p-6
"



>


<div className="
flex
items-center
gap-4
">


<div className="
bg-cyan-500/20
p-4
rounded-xl
">


<FiUsers

className="
text-cyan-400
text-2xl
"

/>


</div>





<div>


<h2 className="
text-white
font-bold
text-xl
">

{person.name}

</h2>


<p className="
text-cyan-400
">

{person.role}

</p>


</div>



</div>








<div className="
mt-5
space-y-3
text-slate-300
">


<p className="
flex
items-center
gap-2
">


<FiMail/>

{person.email}


</p>




<p className="
flex
items-center
gap-2
">


<FiPhone/>

{person.phone}


</p>




</div>







<div className="
flex
gap-5
mt-6
">


<button

onClick={()=>openEdit(person)}

className="
text-cyan-400
"


>


<FiEdit2/>

</button>





<button

onClick={()=>deleteStaff(person.id)}

className="
text-red-400
"


>


<FiTrash2/>

</button>






</div>







</div>


))


}



</div>









{

showModal &&



<div className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
">


<form

onSubmit={saveStaff}

className="
bg-slate-900
border
border-white/10
rounded-3xl
p-6
w-full
max-w-md
space-y-4
"


>



<div className="
flex
justify-between
items-center
">


<h2 className="
text-white
text-xl
font-bold
">

{

editStaff

?

"Edit Staff"

:

"Add Staff"

}


</h2>



<button

type="button"

onClick={()=>setShowModal(false)}

className="
text-white
">


<FiX/>

</button>



</div>









<input

placeholder="Name"

value={form.name}

onChange={(e)=>setForm({

...form,

name:e.target.value

})}


className="
w-full
bg-white/10
p-3
rounded-xl
text-white
"


/>









<input

placeholder="Role"

value={form.role}

onChange={(e)=>setForm({

...form,

role:e.target.value

})}


className="
w-full
bg-white/10
p-3
rounded-xl
text-white
"


/>









<input

placeholder="Email"

value={form.email}

onChange={(e)=>setForm({

...form,

email:e.target.value

})}


className="
w-full
bg-white/10
p-3
rounded-xl
text-white
"


/>









<input

placeholder="Phone"

value={form.phone}

onChange={(e)=>setForm({

...form,

phone:e.target.value

})}


className="
w-full
bg-white/10
p-3
rounded-xl
text-white
"


/>









<button

className="
w-full
bg-cyan-500
py-3
rounded-xl
text-white
font-semibold
"


>

Save Staff

</button>







</form>



</div>


}




</div>


</DashboardLayout>


)


}