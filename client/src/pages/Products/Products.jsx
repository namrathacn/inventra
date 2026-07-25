import {
  FiSearch,
  FiPlus,
  FiPackage,
  FiAlertTriangle,
  FiEdit2,
  FiTrash2,
  FiX
} from "react-icons/fi";

import { useState } from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useCurrency } from "../../context/CurrencyContext";

import { useSearch } from "../../context/SearchContext";



export default function Products(){



const {
currencySymbol,
convertAmount

}=useCurrency();




const {
search

}=useSearch();







const [products,setProducts]=useState([



{
id:1,
name:"MacBook Pro",
category:"Laptop",
price:120000,
stock:25
},


{
id:2,
name:"Gaming Keyboard",
category:"Accessories",
price:8500,
stock:8
},


{
id:3,
name:"4K Monitor",
category:"Display",
price:32000,
stock:14
}



]);







const [showModal,setShowModal]=useState(false);



const [editProduct,setEditProduct]=useState(null);






const [form,setForm]=useState({

name:"",
category:"",
price:"",
stock:""

});









function openAdd(){


setEditProduct(null);


setForm({

name:"",
category:"",
price:"",
stock:""

});


setShowModal(true);


}









function openEdit(product){


setEditProduct(product);


setForm(product);


setShowModal(true);



}









function saveProduct(e){


e.preventDefault();



if(

!form.name ||

!form.category ||

!form.price ||

!form.stock

)

return;





if(editProduct){


setProducts(

products.map(item=>

item.id===editProduct.id

?

{

...form,

id:item.id,

price:Number(form.price),

stock:Number(form.stock)

}

:

item

)


);


}

else{


setProducts([

...products,

{

...form,

id:Date.now(),

price:Number(form.price),

stock:Number(form.stock)

}


]);


}





setShowModal(false);


}








function deleteProduct(id){


setProducts(

products.filter(

item=>item.id!==id

)

);


}









const filteredProducts =

products.filter(product=>

product.name

.toLowerCase()

.includes(search.toLowerCase())



||
product.category

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

Products

</h1>


<p className="
text-slate-400
">

Manage your inventory

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
"


>


<FiPlus/>

Add Product


</button>


</div>









<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
">



{

filteredProducts.map(product=>(


<motion.div


key={product.id}


whileHover={{
scale:1.03
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
">


<div className="
bg-cyan-500/20
p-3
rounded-xl
">


<FiPackage

className="
text-cyan-400
text-2xl
"

/>


</div>






{

product.stock<10 &&


<FiAlertTriangle

className="
text-yellow-400
text-xl
"

/>


}



</div>








<h2 className="
text-xl
font-bold
text-white
mt-5
">


{product.name}


</h2>




<p className="
text-slate-400
">

{product.category}

</p>







<div className="mt-5 space-y-2">


<p className="text-white">

Price:

{" "}

{currencySymbol}

{convertAmount(product.price)}

</p>




<p className="text-white">

Stock:

{" "}

{product.stock}

</p>



</div>









<div className="
flex
justify-between
items-center
mt-6
">


<span className={

product.stock<10

?

"bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"

:

"bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"

}>


{

product.stock<10

?

"Low Stock"

:

"Available"

}



</span>









<div className="
flex
gap-4
">


<button

onClick={()=>openEdit(product)}

className="
text-cyan-400
"

>


<FiEdit2/>


</button>




<button

onClick={()=>deleteProduct(product.id)}

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

onSubmit={saveProduct}

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
">


<h2 className="
text-white
text-xl
font-bold
">

{

editProduct

?

"Edit Product"

:

"Add Product"

}

</h2>



<button

type="button"

onClick={()=>setShowModal(false)}

className="text-white"

>


<FiX/>


</button>


</div>







<input

placeholder="Product name"

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

placeholder="Category"

value={form.category}

onChange={(e)=>setForm({

...form,

category:e.target.value

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

placeholder="Price"

value={form.price}

onChange={(e)=>setForm({

...form,

price:e.target.value

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

placeholder="Stock"

value={form.stock}

onChange={(e)=>setForm({

...form,

stock:e.target.value

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

Save Product

</button>






</form>



</div>


}





</div>


</DashboardLayout>


)


}