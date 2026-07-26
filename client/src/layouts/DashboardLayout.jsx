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
"
>


{/* Fixed Sidebar */}

<aside
className="
fixed
left-0
top-0
h-screen
w-72
z-50
"
>

<Sidebar />

</aside>





{/* Main Content */}

<div
className="
ml-72
flex-1
min-h-screen
"
>


{/* Topbar */}

<div
className="
sticky
top-0
z-40
"
>

<Topbar />

</div>




{/* Scroll Area */}

<main
className="
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