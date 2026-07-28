import {
  FiPlus,
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiX
} from "react-icons/fi";


import {
  useState,
  useEffect
} from "react";


import { motion } from "framer-motion";


import DashboardLayout from "../../layouts/DashboardLayout";


import { useCurrency } from "../../context/CurrencyContext";


import { useSearch } from "../../context/SearchContext";


import { useData } from "../../context/DataContext";





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
setOrders
}=useData();







useEffect(()=>{


if(orders?.length){


addSearchItems(

orders.map(order=>({

name:order.customer,

type:"Order",

path:"/orders"

}))

);


}


},[orders]);







const [showModal,setShowModal]=useState(false);


const [editOrder,setEditOrder]=useState(null);




const [form,setForm]=useState({

customer:"",

product:"",

amount:"",

status:"Pending"

});









function openAdd(){


setEditOrder(null);


setForm({

customer:"",

product:"",

amount:"",

status:"Pending"

});


setShowModal(true);


}








function openEdit(order){


setEditOrder(order);


setForm(order);


setShowModal(true);


}








function saveOrder(e){


e.preventDefault();



if(
!form.customer ||
!form.product ||
!form.amount
)

return;








if(editOrder){


setOrders(

orders.map(item=>

item.id===editOrder.id

?

{

...form,

id:item.id,

amount:Number(form.amount)

}

:

item

)

);



}

else{


setOrders([

...orders,

{

...form,

id:Date.now(),

amount:Number(form.amount)

}

]);


}



setShowModal(false);


}









function deleteOrder(id){


setOrders(

orders.filter(

item=>item.id!==id

)

);


}









const filteredOrders =
orders.filter(order=>


order.customer

.toLowerCase()

.includes(search.toLowerCase())


||

order.product

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
backdrop-blur-xl
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

Orders

</h1>



<p className="
text-slate-400
">

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


<div className="
flex
justify-between
items-center
gap-5
">






<div className="
flex
items-center
gap-5
">


<div className="
bg-cyan-500/20
p-4
rounded-xl
">


<FiShoppingCart

className="
text-cyan-400
text-2xl
"

/>


</div>







<div>


<h2 className="
text-xl
font-bold
text-white
">

{order.customer}

</h2>




<p className="
text-slate-400
">

{order.product}

</p>





<p className="
text-white
mt-2
">


{currencySymbol}

{Math.round(

convertAmount(order.amount)

).toLocaleString()}


</p>


</div>


</div>








<div className="
flex
items-center
gap-4
">



<span

className={

order.status==="Completed"

?

"flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full"

:

order.status==="Pending"

?

"flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full"

:

"flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full"

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
"

>

<FiEdit2/>

</button>







<button

onClick={()=>deleteOrder(order.id)}

className="
text-red-400
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









{/* ORDER MODAL */}



{

showModal &&


<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
backdrop-blur-sm
">



<div className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-[#07111f]
p-8
shadow-2xl
">





<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-2xl
font-bold
text-white
">


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



<input

placeholder="Customer Name"

value={form.customer}

onChange={
e=>setForm({
...form,
customer:e.target.value
})
}

className="
w-full
rounded-xl
bg-white/10
border
border-white/10
p-3
text-white
outline-none
"

/>







<input

placeholder="Product Name"

value={form.product}

onChange={
e=>setForm({
...form,
product:e.target.value
})
}

className="
w-full
rounded-xl
bg-white/10
border
border-white/10
p-3
text-white
outline-none
"

/>







<input

placeholder="Amount"

type="number"

value={form.amount}

onChange={
e=>setForm({
...form,
amount:e.target.value
})
}

className="
w-full
rounded-xl
bg-white/10
border
border-white/10
p-3
text-white
outline-none
"

/>








<div className="relative">


<select

value={form.status}

onChange={
e=>setForm({
...form,
status:e.target.value
})
}

className="
appearance-none
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
text-white
outline-none
backdrop-blur-xl
cursor-pointer
"

>


<option
value="Pending"
className="bg-[#07111f] text-white"
>
Pending
</option>


<option
value="Completed"
className="bg-[#07111f] text-white"
>
Completed
</option>


<option
value="Cancelled"
className="bg-[#07111f] text-white"
>
Cancelled
</option>


</select>



<div

className="
absolute
right-4
top-1/2
-translate-y-1/2
pointer-events-none
text-slate-300
"

>

⌄

</div>



</div>





<button

className="
w-full
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-600
py-3
font-semibold
text-white
"

>


{

editOrder
?
"Update Order"
:
"Save Order"

}


</button>





</form>





</div>


</div>


}







</div>


</DashboardLayout>


)


}