import {
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";
import { useData } from "../../context/DataContext";

export default function RevenueChart() {
  const { formatCurrency } = useCurrency();
  const { orders } = useData();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map((month, index) => {
    const revenue = orders
      .filter((order) => {
        if (!order.createdAt) return false;

        let date;

        if (order.createdAt?.seconds) {
          date = new Date(order.createdAt.seconds * 1000);
        } else {
          date = new Date(order.createdAt);
        }

        return date.getMonth() === index;
      })
      .reduce(
        (sum, order) =>
          sum + Number(order.amount || order.total || 0),
        0
      );

    return {
      month,
      revenue,
    };
  });

  const totalRevenue = data.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const currentMonth = new Date().getMonth();

  const currentRevenue = data[currentMonth]?.revenue || 0;

  const previousRevenue =
    currentMonth > 0
      ? data[currentMonth - 1]?.revenue || 0
      : 0;

  const growth =
    previousRevenue === 0
      ? currentRevenue > 0
        ? 100
        : 0
      : Math.round(
          ((currentRevenue - previousRevenue) /
            previousRevenue) *
            100
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#0b1220]/80
        p-7
        backdrop-blur-xl
        shadow-2xl
      "
    >
      <div
        className="
          absolute
          -right-20
          -top-20
          h-80
          w-80
          rounded-full
          bg-emerald-500/20
          blur-3xl
        "
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-emerald-500/20
                flex
                items-center
                justify-center
                text-emerald-400
                text-2xl
              "
            >
              <FiDollarSign />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Revenue Overview
              </h2>

              <p className="text-sm text-slate-400">
                Monthly Revenue
              </p>
            </div>
          </div>

          <div
            className="
              rounded-full
              bg-green-500/20
              px-4
              py-2
              flex
              items-center
              gap-2
              text-green-400
              font-semibold
            "
          >
            <FiTrendingUp />
            {growth}%
          </div>
        </div>

        <h1 className="text-4xl font-black text-white mb-2">
          {formatCurrency(totalRevenue)}
        </h1>

        <p className="text-slate-400 mb-8">
          Total Revenue
        </p>

        <div className="h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis
                dataKey="month"
                stroke="#64748b"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#64748b"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value >= 1000
                    ? `${Math.round(value / 1000)}k`
                    : value
                }
              />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(Number(value))
                }
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />

              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10b981"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={4}
                fill="url(#revenueGradient)"
                animationDuration={1200}
                dot={{
                  r: 5,
                  fill: "#10b981",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#34d399",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}