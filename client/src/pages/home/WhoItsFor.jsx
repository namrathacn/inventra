import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiHome,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";

const businesses = [
  {
    icon: <FiShoppingBag />,
    title: "Retail Stores",
    description:
      "Track products, monitor sales, manage inventory and avoid stock shortages in your physical store.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: <FiHome />,
    title: "Small Businesses",
    description:
      "Replace spreadsheets with a modern inventory platform that keeps products, orders and reports organised.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: <FiTruck />,
    title: "E-Commerce Sellers",
    description:
      "Manage online orders, monitor inventory levels and identify your best-selling products instantly.",
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function WhoItsFor() {
  return (
    <section className="relative z-10 py-32 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-cyan-400 font-semibold">
            Who Uses Inventra
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Built for
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            Whether you run a retail store, warehouse or online business,
            Inventra gives you complete visibility over products, stock,
            sales and business performance.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {businesses.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 relative overflow-hidden"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient}
                flex items-center justify-center text-white text-3xl shadow-xl`}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-5 text-slate-400 leading-8">
                {item.description}
              </p>

              <button
                className="
                mt-8
                flex
                items-center
                gap-2
                text-cyan-400
                font-semibold
                hover:gap-4
                transition-all"
              >
                Learn More
                <FiArrowRight />
              </button>

              <div
                className="
                absolute
                -right-16
                -bottom-16
                w-48
                h-48
                rounded-full
                bg-cyan-500/10
                blur-3xl"
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}