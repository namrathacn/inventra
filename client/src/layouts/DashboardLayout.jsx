import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";


export default function DashboardLayout({ children }) {


return (

<div
className="
min-h-screen
bg-[#050816]
text-white
flex
overflow-x-hidden
"
>



{/* SIDEBAR */}

<aside

className="
fixed
left-0
top-0
h-screen
w-72
z-30
"

>

<Sidebar />

</aside>







{/* MAIN AREA */}

<div

className="
ml-72
flex-1
min-h-screen
relative
z-10
"

>





{/* TOPBAR */}

<div

className="
sticky
top-0
z-20
"

>

<Topbar />

</div>







{/* CONTENT */}

<main

className="
relative
z-10
p-6
md:p-8
"

>

{children}

</main>





</div>



</div>

);

}