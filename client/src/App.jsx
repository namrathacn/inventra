import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Reports from './pages/Reports/Reports';
import Staff from './pages/Staff/Staff';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;