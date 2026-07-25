import Sidebar from "../components/layout/Sidebar";

import Topbar from "../components/layout/Topbar";

import { useTheme } from "../context/ThemeContext";



export default function DashboardLayout({children}){


const {theme}=useTheme();




return(



<div

className={

theme==="dark"

?

"min-h-screen bg-slate-950 text-white flex"

:

"min-h-screen bg-slate-100 text-slate-900 flex"

}

>



<Sidebar/>




<div className="flex-1">



<Topbar/>




<main className="p-6">


{children}


</main>




</div>




</div>



)


}