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

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";
import { useSearch } from "../../context/SearchContext";
import { useData } from "../../context/DataContext";

import api from "../../services/api";

import toast from "react-hot-toast";


export default function Orders() {


  const {
    currencySymbol,
    convertAmount
  } = useCurrency();


  const {
    search,
    addSearchItems
  } = useSearch();


  const {
    orders,
    loadOrders
  } = useData();



  const [loading,setLoading] = useState(false);

  const [showModal,setShowModal] = useState(false);

  const [editOrder,setEditOrder] = useState(null);



  const [form,setForm] = useState({

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

        orders.map(order=>({

          name:order.customer,
          type:"Order",
          path:"/orders"

        }))

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

      customer:order.customer,
      product:order.product,
      quantity:order.quantity || 1,
      amount:order.amount,
      status:order.status

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



      const data={

        ...form,

        quantity:Number(form.quantity) || 1,

        amount:Number(form.amount)

      };



      if(editOrder){


        await api.put(

          `/orders/${editOrder.id}`,

          data

        );


        toast.success("Order updated");


      }
      else{


        await api.post(

          "/orders",

          data

        );


        toast.success("Order added");


      }



      await loadOrders();



      setShowModal(false);

      setEditOrder(null);



    }
    catch(error){


      console.error(error.response?.data || error);


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


    const text = search.toLowerCase();


    return (

      order.customer
      ?.toLowerCase()
      .includes(text)

      ||

      order.product
      ?.toLowerCase()
      .includes(text)

    );


  });





return (

<DashboardLayout>


<div className="space-y-8">


<div className="
rounded-3xl
bg-white/5
border border-white/10
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

whileHover={{scale:1.02}}

className="
rounded-3xl
bg-white/5
border border-white/10
backdrop-blur-xl
p-6
"


>


<div className="
flex
justify-between
items-center
">


<div className="
flex
gap-5
items-center
">


<div className="
bg-cyan-500/20
p-4
rounded-xl
">

<FiShoppingCart className="text-cyan-400 text-2xl"/>

</div>



<div>

<h2 className="
text-xl
font-bold
text-white
">

{order.customer}

</h2>


<p className="text-slate-400">

{order.product}

</p>


<p className="text-white mt-2">

{currencySymbol}

{Math.round(
convertAmount(order.amount)
).toLocaleString()}

</p>


</div>


</div>




<div className="flex gap-4 items-center">


<span className={

order.status==="Completed"

?

"bg-green-500/20 text-green-400 px-4 py-2 rounded-full flex gap-2 items-center"

:

order.status==="Pending"

?

"bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full flex gap-2 items-center"

:

"bg-red-500/20 text-red-400 px-4 py-2 rounded-full flex gap-2 items-center"

}>


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

className="text-cyan-400"

>

<FiEdit2/>

</button>



<button

onClick={()=>deleteOrder(order.id)}

className="text-red-400"

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

<div className="
fixed inset-0
z-50
flex
items-center
justify-center
bg-black/60
backdrop-blur-sm
">


<div className="
bg-[#07111f]
border border-white/10
rounded-3xl
p-8
w-full
max-w-md
">


<div className="
flex
justify-between
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

>

<FiX className="text-white"/>

</button>


</div>





<form

onSubmit={saveOrder}

className="space-y-4"

>


<input

placeholder="Customer"

value={form.customer}

onChange={e=>setForm({...form,customer:e.target.value})}

className="input-style"

/>



<input

placeholder="Product"

value={form.product}

onChange={e=>setForm({...form,product:e.target.value})}

className="input-style"

/>



<input

placeholder="Quantity"

type="number"

value={form.quantity}

onChange={e=>setForm({...form,quantity:e.target.value})}

className="input-style"

/>



<input

placeholder="Amount"

type="number"

value={form.amount}

onChange={e=>setForm({...form,amount:e.target.value})}

className="input-style"

/>



<select

value={form.status}

onChange={e=>setForm({...form,status:e.target.value})}

className="input-style"

>

<option>Pending</option>

<option>Completed</option>

<option>Cancelled</option>

</select>



<button

disabled={loading}

className="
w-full
bg-gradient-to-r
from-cyan-500
to-blue-600
py-3
rounded-xl
text-white
"

>

{

loading

?

"Saving..."

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

);

}