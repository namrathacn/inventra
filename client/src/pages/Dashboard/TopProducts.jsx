import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";
import { useData } from "../../context/DataContext";

export default function TopProducts() {
  const { formatCurrency } = useCurrency();
  const { orders } = useData();

  const productSales = {};

  orders.forEach((order) => {
    const name = order.product || "Unknown Product";

    if (!productSales[name]) {
      productSales[name] = {
        name,
        quantity: 0,
        revenue: 0,
      };
    }

    productSales[name].quantity += Number(order.quantity || 1);
    productSales[name].revenue += Number(order.amount || 0);
  });

  const products = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const highestQuantity =
    products.length > 0
      ? Math.max(...products.map((p) => p.quantity), 1)
      : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.06]
        p-7
        backdrop-blur-2xl
        shadow-xl
      "
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Top Selling Products
        </h2>

        <span
          className="
            rounded-full
            bg-cyan-400/10
            px-4
            py-2
            text-xs
            font-semibold
            text-cyan-300
          "
        >
          Live
        </span>
      </div>

      <div className="space-y-7">
        {products.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            No sales available
          </div>
        ) : (
          products.map((item, index) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">
                    #{index + 1} {item.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {formatCurrency(item.revenue)}
                  </p>
                </div>

                <p className="font-bold text-cyan-400">
                  {item.quantity} Sold
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(item.quantity / highestQuantity) * 100}%`,
                  }}
                  transition={{ duration: 1 }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-500
                  "
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}