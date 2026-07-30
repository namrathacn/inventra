import {
  FiPlus,
  FiPackage,
  FiAlertTriangle,
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

export default function Products() {
  const {
    currencySymbol,
    convertAmount,
  } = useCurrency();

  const {
    search,
    addSearchItems,
  } = useSearch();

  const {
    products,
    loadProducts,
  } = useData();

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length) {
      addSearchItems(
        products.map((product) => ({
          name: product.name,
          type: "Product",
          path: "/products",
        }))
      );
    }
  }, [products]);

  function openAdd() {
    setEditProduct(null);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowModal(true);
  }

  function openEdit(product) {
    setEditProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });

    setShowModal(true);
  }

  async function saveProduct(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (editProduct) {
        await api.put(`/products/${editProduct.id}`, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });

        toast.success("Product updated");
      } else {
        await api.post("/products", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });

        toast.success("Product added");
      }

      await loadProducts();

      setShowModal(false);

      setEditProduct(null);

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to save product");
    }

    setLoading(false);
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted");

      await loadProducts();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  }

  const filteredProducts = products.filter((product) => {
    const text = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    );
  });
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

product.stock < 10 &&

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


<span

className={

product.stock < 10

?

"bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"

:

"bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"

}

>


{

product.stock < 10

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









{/* ADD / EDIT MODAL */}



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

editProduct
?
"Edit Product"
:
"Add Product"

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

onSubmit={saveProduct}

className="
space-y-4
"


>


<input

placeholder="Product Name"

value={form.name}

onChange={
e=>setForm({
...form,
name:e.target.value
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

placeholder="Category"

value={form.category}

onChange={
e=>setForm({
...form,
category:e.target.value
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

placeholder="Price"

type="number"

value={form.price}

onChange={
e=>setForm({
...form,
price:e.target.value
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

placeholder="Stock"

type="number"

value={form.stock}

onChange={
e=>setForm({
...form,
stock:e.target.value
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
disabled:opacity-60
disabled:cursor-not-allowed
"
>


{
loading
?
(editProduct ? "Updating..." : "Saving...")
:
(editProduct ? "Update Product" : "Save Product")
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