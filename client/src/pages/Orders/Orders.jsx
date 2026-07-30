import {
  FiPlus,
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import {
  useState,
  useEffect,
} from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";
import { useSearch } from "../../context/SearchContext";
import { useData } from "../../context/DataContext";

import api from "../../services/api";

import toast from "react-hot-toast";



export default function Orders(){


const {
 currencySymbol,
 convertAmount
}=useCurrency();



const {
 search,
 addSearchItems
}=useSearch();



const {
 orders,
 loadOrders
}=useData();




const [loading,setLoading]=useState(false);

const [showModal,setShowModal]=useState(false);

const [editOrder,setEditOrder]=useState(null);




const [form,setForm]=useState({

customer:"",
product:"",
quantity:"",
amount:"",
status:"Pending"

});





useEffect(()=>{

loadOrders();

},[]);






useEffect(()=>{


if(orders.length){


addSearchItems(

orders.map(order=>(

{

name:order.customer,

type:"Order",

path:"/orders"

}

))

);


}


},[orders]);








function openAdd(){


setEditOrder(null);


setForm({

customer:"",
product:"",
quantity:"",
amount:"",
status:"Pending"

});


setShowModal(true);


}







function openEdit(order){



setEditOrder(order);



setForm({

customer:order.customer || "",

product:order.product || "",

quantity:order.quantity || "",

amount:order.amount || "",

status:order.status || "Pending"

});



setShowModal(true);



}








async function saveOrder(e){


e.preventDefault();



if(
!form.customer ||
!form.product ||
!form.amount
){

toast.error("Please fill all fields");

return;

}




try{


setLoading(true);



const orderData={

...form,

quantity:Number(form.quantity)||1,

amount:Number(form.amount)

};





if(editOrder){


await api.put(

`/orders/${editOrder.id}`,

orderData

);


toast.success("Order updated");


}

else{


await api.post(

"/orders",

orderData

);


toast.success("Order added");


}





await loadOrders();



setShowModal(false);

setEditOrder(null);



setForm({

customer:"",
product:"",
quantity:"",
amount:"",
status:"Pending"

});



}
catch(error){


console.error(

error.response?.data || error

);



toast.error(

error.response?.data?.message ||

"Failed to save order"

);


}


setLoading(false);



}








async function deleteOrder(id){


if(!window.confirm("Delete this order?"))

return;



try{


await api.delete(`/orders/${id}`);


toast.success("Order deleted");


loadOrders();


}

catch(error){


console.error(error);


toast.error("Delete failed");


}



}







const filteredOrders = orders.filter(order=>{


const text=search.toLowerCase();



return(

order.customer
?.toLowerCase()
.includes(text)

||

order.product
?.toLowerCase()
.includes(text)

);


});
return(

<DashboardLayout>


<div className="space-y-8">





<div
className="
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-8
flex
justify-between
items-center
"
>


<div>


<h1
className="
text-3xl
font-bold
text-white
"
>

Orders

</h1>


<p
className="
text-slate-400
"
>

Manage customer orders

</p>


</div>




<button

onClick={openAdd}

className="
bg-cyan-500
hover:bg-cyan-400
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
transition
"

>

<FiPlus/>

Add Order

</button>


</div>








<div className="space-y-5">


{


filteredOrders.map(order=>(


<motion.div


key={order.id}


whileHover={{
scale:1.02
}}


className="
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-6
"


>



<div
className="
flex
justify-between
items-center
gap-5
"
>




<div
className="
flex
items-center
gap-5
"
>



<div
className="
bg-cyan-500/20
p-4
rounded-xl
"
>


<FiShoppingCart
className="
text-cyan-400
text-2xl
"
/>


</div>





<div>



<h2
className="
text-xl
font-bold
text-white
"
>

{order.customer}

</h2>



<p
className="
text-slate-400
"
>

{order.product}

</p>




<p
className="
text-white
mt-2
"
>


{currencySymbol}

{

Math.round(

convertAmount(order.amount)

)

.toLocaleString("en-GB")

}


</p>



<p
className="
text-sm
text-slate-400
mt-1
"
>

Qty: {order.quantity || 1}

</p>




</div>



</div>








<div
className="
flex
items-center
gap-4
"
>



<span


className={


order.status==="Completed"


?


`
flex
items-center
gap-2
bg-green-500/20
text-green-400
px-4
py-2
rounded-full
`



:


order.status==="Pending"


?


`
flex
items-center
gap-2
bg-yellow-500/20
text-yellow-400
px-4
py-2
rounded-full
`



:


`
flex
items-center
gap-2
bg-red-500/20
text-red-400
px-4
py-2
rounded-full
`



}


>




{

order.status==="Completed"

?

<FiCheckCircle/>

:

order.status==="Pending"

?

<FiClock/>

:

<FiXCircle/>

}



{order.status}



</span>







<button

onClick={()=>openEdit(order)}

className="
text-cyan-400
hover:text-cyan-300
transition
"

>

<FiEdit2/>

</button>







<button

onClick={()=>deleteOrder(order.id)}

className="
text-red-400
hover:text-red-300
transition
"

>

<FiTrash2/>

</button>






</div>




</div>



</motion.div>



))


}



</div>





{
showModal &&


<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
backdrop-blur-md
"

>



<div

className="
w-full
max-w-md
rounded-3xl
border
border-white/20
bg-[#07111f]/80
backdrop-blur-2xl
shadow-2xl
shadow-cyan-500/10
p-8
"

>





<div

className="
flex
justify-between
items-center
mb-6
"

>



<h2

className="
text-2xl
font-bold
text-white
"

>


{

editOrder

?

"Edit Order"

:

"Add Order"

}


</h2>





<button

onClick={()=>setShowModal(false)}

className="
text-slate-400
hover:text-white
transition
"

>

<FiX size={24}/>

</button>



</div>









<form

onSubmit={saveOrder}

className="
space-y-4
"

>




{

[

{
key:"customer",
placeholder:"Customer Name",
type:"text"
},

{
key:"product",
placeholder:"Product Name",
type:"text"
},

{
key:"quantity",
placeholder:"Quantity",
type:"number"
},

{
key:"amount",
placeholder:"Amount",
type:"number"
}


].map(item=>(



<input


key={item.key}


type={item.type}



placeholder={item.placeholder}



value={form[item.key]}



onChange={e=>

setForm({

...form,

[item.key]:e.target.value

})

}



className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
text-white
placeholder:text-slate-400
outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-400/30
transition
"


/>



))


}








<select


value={form.status}



onChange={e=>

setForm({

...form,

status:e.target.value

})

}



className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
text-white
outline-none
cursor-pointer
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-400/30
"

>


<option

value="Pending"

className="bg-[#07111f]"

>

Pending

</option>




<option

value="Completed"

className="bg-[#07111f]"

>

Completed

</option>




<option

value="Cancelled"

className="bg-[#07111f]"

>

Cancelled

</option>



</select>








<button


disabled={loading}



className="
w-full
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-600
py-3
font-semibold
text-white
shadow-lg
shadow-cyan-500/20
hover:scale-[1.02]
transition
disabled:opacity-50
"


>


{

loading

?

(editOrder ? "Updating..." : "Saving...")

:

(editOrder ? "Update Order" : "Save Order")

}



</button>





</form>






</div>





</div>



}





</div>


</DashboardLayout>


);

}