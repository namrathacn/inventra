import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SearchProvider } from "./context/SearchContext";


import Home from "./pages/Home/Home";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import Reports from "./pages/Reports/Reports";
import Staff from "./pages/Staff/Staff";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";



export default function App(){


return (

<AuthProvider>


<CurrencyProvider>


<SearchProvider>


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
path="/reports"
element={<Reports/>}
/>



<Route
path="/staff"
element={<Staff/>}
/>



<Route
path="/profile"
element={<Profile/>}
/>



<Route
path="/settings"
element={<Settings/>}
/>


</Routes>


</SearchProvider>


</CurrencyProvider>


</AuthProvider>


);

}