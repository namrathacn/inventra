import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import DashboardBackground from "../components/layout/DashboardBackground";


export default function DashboardLayout({ children }) {

return (

<div className="
relative
flex
min-h-screen
bg-[#070B16]
text-white
overflow-hidden
">


<DashboardBackground/>


<Sidebar/>


<div className="
flex
flex-1
flex-col
">


<Topbar/>


<main className="
flex-1
p-6
relative
z-10
">

{children}

</main>


</div>


</div>

);

}