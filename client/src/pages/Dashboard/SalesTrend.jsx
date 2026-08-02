import { FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";

export default function SalesTrend() {
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

  const sales = months.map((month, index) => {
    const total = orders
      .filter((order) => {
        if (!order.createdAt) return false;

        let date;

        if (order.createdAt.seconds) {
          date = new Date(order.createdAt.seconds * 1000);
        } else {
          date = new Date(order.createdAt);
        }

        return date.getMonth() === index;
      })
      .reduce(
        (sum, order) => sum + Number(order.amount || 0),
        0
      );

    return {
      month,
      value: total,
    };
  });

  const highest = Math.max(
    ...sales.map((s) => s.value),
    1
  );

  const totalSales = sales.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const bestMonth =
    sales.reduce(
      (max, item) =>
        item.value > max.value ? item : max,
      sales[0]
    )?.month || "-";

  const currentMonth = new Date().getMonth();

  const previous =
    currentMonth > 0
      ? sales[currentMonth - 1].value
      : 0;

  const current = sales[currentMonth].value;

  const growth =
    previous === 0
      ? 100
      : Math.round(
          ((current - previous) / previous) * 100
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      backdrop-blur-xl
      shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Sales Growth
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Monthly Revenue
          </p>
        </div>

        <div className="rounded-2xl bg-green-500/20 p-3">
          <FiTrendingUp className="text-2xl text-green-400" />
        </div>
      </div>

      <div className="mt-8 h-56 flex items-end gap-5 rounded-2xl bg-black/10 p-5">
        {sales.map((item, index) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center justify-end gap-3"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: `${Math.max(
                  (item.value / highest) * 100,
                  item.value > 0 ? 8 : 0
                )}%`,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
              }}
              className="
              w-full
              rounded-t-xl
              bg-gradient-to-t
              from-blue-600
              via-cyan-400
              to-green-400
              "
            />

            <span className="text-xs text-slate-400">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            Growth
          </p>

          <h3 className="text-2xl font-bold text-green-400">
            {growth}%
          </h3>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">
            Best Month
          </p>

          <h3 className="text-2xl font-bold text-white">
            {bestMonth}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}