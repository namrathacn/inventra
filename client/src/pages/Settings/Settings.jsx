import DashboardLayout from "../../layouts/DashboardLayout";

import {
FiMoon,
FiSun
} from "react-icons/fi";


import {useTheme} from "../../context/ThemeContext";



export default function Settings(){



const {

theme,

toggleTheme

}=useTheme();






return(


<DashboardLayout>


<div className="space-y-8">





<div

className={

theme==="dark"

?

"rounded-3xl bg-white/5 border border-white/10 p-8"

:

"rounded-3xl bg-white border border-slate-200 p-8"

}


>


<h1

className={

theme==="dark"

?

"text-3xl font-bold text-white"

:

"text-3xl font-bold text-slate-900"

}

>

Settings

</h1>




<p

className={

theme==="dark"

?

"text-slate-400 mt-2"

:

"text-slate-600 mt-2"

}

>

Manage application preferences

</p>



</div>









<div

className={

theme==="dark"

?

"rounded-3xl bg-white/5 border border-white/10 p-8 flex justify-between items-center"

:

"rounded-3xl bg-white border border-slate-200 p-8 flex justify-between items-center"

}


>


<div className="flex items-center gap-5">


<div className="p-4 rounded-xl bg-cyan-500/20">


{

theme==="dark"

?

<FiMoon className="text-cyan-400 text-3xl"/>

:

<FiSun className="text-yellow-500 text-3xl"/>

}


</div>




<div>


<h2

className={

theme==="dark"

?

"text-xl font-bold text-white"

:

"text-xl font-bold text-slate-900"

}

>

Appearance

</h2>



<p

className={

theme==="dark"

?

"text-slate-400"

:

"text-slate-600"

}

>


Current theme : {theme}


</p>


</div>



</div>








<button

onClick={toggleTheme}


className="

bg-cyan-500

hover:bg-cyan-600

px-5

py-3

rounded-xl

text-white

font-semibold

"


>


{

theme==="dark"

?

"Light Mode"

:

"Dark Mode"

}



</button>




</div>









</div>



</DashboardLayout>


)


}