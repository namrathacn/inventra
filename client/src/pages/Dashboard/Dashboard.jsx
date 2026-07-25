import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiAlertTriangle,
} from "react-icons/fi";

import StatCard from "../../components/cards/StatCard";

import RevenueChart from "../../components/charts/RevenueChart";
import OrdersTable from "../../components/dashboard/OrdersTable";
import TopProducts from "../../components/dashboard/TopProducts";
import LowStock from "../../components/dashboard/LowStock";

import { useCurrency } from "../../context/CurrencyContext";


export default function Dashboard() {


const { currency } = useCurrency();



return (

<DashboardLayout>


{/* STAT CARDS */}

<div className="
grid
gap-6
lg:grid-cols-4
">


<StatCard

title="Revenue"

value={18420 * currency.rate}

prefix={currency.symbol}

change="+18.4%"

color="#3B82F6"

icon={<FiDollarSign />}

/>



<StatCard

title="Orders"

value={267}

change="+7.2%"

color="#06B6D4"

icon={<FiShoppingCart />}

/>



<StatCard

title="Products"

value={421}

change="+3.8%"

color="#10B981"

icon={<FiPackage />}

/>



<StatCard

title="Low Stock"

value={14}

change="-5 today"

color="#F59E0B"

icon={<FiAlertTriangle />}

/>


</div>





{/* REVENUE CHART */}

<div className="mt-8">

<RevenueChart />

</div>





{/* ORDERS + LOW STOCK */}

<div className="
mt-8
grid
gap-6
lg:grid-cols-2
">


<OrdersTable />


<LowStock />


</div>





{/* TOP PRODUCTS */}

<div className="mt-8">

<TopProducts />

</div>




</DashboardLayout>


);

}