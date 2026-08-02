import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";


import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SearchProvider } from "./context/SearchContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";


import Home from "./pages/home/Home";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import StaffSignup from "./pages/Signup/StaffSignup";

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

path="/staff-signup"

element={<StaffSignup/>}

/>





<Route
path="/dashboard"
element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
}
/>

<Route
path="/products"
element={
  <ProtectedRoute>
    <Products />
  </ProtectedRoute>
}
/>

<Route
path="/orders"
element={
  <ProtectedRoute>
    <Orders />
  </ProtectedRoute>
}
/>

<Route
path="/profile"
element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
}
/>

<Route
path="/reports"
element={
  <ProtectedRoute>
    <Reports />
  </ProtectedRoute>
}
/>




<Route
path="/staff"
element={
<ProtectedRoute adminOnly={true}>
  <Staff/>
</ProtectedRoute>
}
/>


<Route
path="/settings"
element={
<ProtectedRoute adminOnly={true}>
  <Settings />
</ProtectedRoute>
}
/>





{/* Settings Feature Pages */}


<Route
path="/notifications"
element={
  <ProtectedRoute adminOnly={true}>
    <Notifications />
  </ProtectedRoute>
}
/>


<Route
path="/ai"
element={
  <ProtectedRoute adminOnly={true}>
    <InventraAI />
  </ProtectedRoute>
}
/>


<Route
path="/database"
element={
  <ProtectedRoute adminOnly={true}>
    <Database />
  </ProtectedRoute>
}
/>


<Route
path="/security"
element={
  <ProtectedRoute adminOnly={true}>
    <Security />
  </ProtectedRoute>
}
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