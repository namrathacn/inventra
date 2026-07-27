import { FiBox, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

import { useSearch } from "../../context/SearchContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useData } from "../../context/DataContext";

export default function TopProducts() {
  const { search } = useSearch();

  const { formatCurrency } = useCurrency();

  const { products } = useData();

  const filteredProducts = products.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
    "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Top Products
          </h2>

          <p className="text-sm text-slate-400">
            Best selling items
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-500/20 p-3">
          <FiTrendingUp className="text-cyan-400 text-2xl" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .sort((a, b) => b.sales - a.sales)
            .map((product, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={product.id}
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-4
                transition
              "
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-purple-500/20 p-3">
                    <FiBox className="text-purple-400 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      #{index + 1} {product.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {product.category}
                    </p>

                    <p className="text-xs text-cyan-400 mt-1">
                      {product.sales} Sold
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-400">
                    {formatCurrency(product.price)}
                  </p>

                  <p className="text-sm text-green-400">
                    ↗ +9%
                  </p>
                </div>
              </motion.div>
            ))
        ) : (
          <div className="py-10 text-center text-slate-400">
            No products found
          </div>
        )}
      </div>
    </motion.div>
  );
}