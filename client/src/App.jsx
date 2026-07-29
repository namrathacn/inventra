import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";


import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SearchProvider } from "./context/SearchContext";
import { DataProvider } from "./context/DataContext";



import Home from "./pages/home/Home";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";


import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";

import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Reports from "./pages/Reports/Reports";
import Staff from "./pages/Staff/Staff";


// New Settings Pages

import Notifications from "./pages/Notifications/Notifications";
import InventraAI from "./pages/InventraAI/InventraAI";
import Database from "./pages/Database/Database";
import Security from "./pages/Security/Security";




export default function App(){


return(

<AuthProvider>

<CurrencyProvider>

<SearchProvider>

<DataProvider>



<Toaster

position="top-right"

/>



<Routes>




<Route

path="/"

element={<Home/>}

/>



<Route

path="/login"

element={<Login/>}

/>



<Route

path="/signup"

element={<Signup/>}

/>





<Route

path="/dashboard"

element={<Dashboard/>}

/>




<Route

path="/products"

element={<Products/>}

/>




<Route

path="/orders"

element={<Orders/>}

/>




<Route

path="/settings"

element={<Settings/>}

/>




<Route

path="/profile"

element={<Profile/>}

/>




<Route

path="/reports"

element={<Reports/>}

/>




<Route

path="/staff"

element={<Staff/>}

/>





{/* Settings Feature Pages */}



<Route

path="/notifications"

element={<Notifications/>}

/>




<Route

path="/ai"

element={<InventraAI/>}

/>




<Route

path="/database"

element={<Database/>}

/>




<Route

path="/security"

element={<Security/>}

/>






<Route

path="*"

element={

<div

className="
min-h-screen
flex
items-center
justify-center
bg-[#020617]
text-white
text-4xl
font-black
"

>

Page Not Found

</div>

}

/>



</Routes>




</DataProvider>

</SearchProvider>

</CurrencyProvider>

</AuthProvider>


)

}