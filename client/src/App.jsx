import { Routes, Route } from "react-router-dom";


import { AuthProvider } from "./context/AuthContext";

import { ThemeProvider } from "./context/ThemeContext";

import { CurrencyProvider } from "./context/CurrencyContext";

import { SearchProvider } from "./context/SearchContext";



import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";

import Products from "./pages/Products/Products";

import Orders from "./pages/Orders/Orders";

import Profile from "./pages/Profile/Profile";

import Reports from "./pages/Reports/Reports";

import Settings from "./pages/Settings/Settings";

import Staff from "./pages/Staff/Staff";





export default function App(){


return(


<AuthProvider>


<ThemeProvider>


<CurrencyProvider>


<SearchProvider>


<Routes>



<Route

path="/login"

element={<Login/>}

/>



<Route

path="/"

element={<Dashboard/>}

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


</ThemeProvider>


</AuthProvider>


);


}