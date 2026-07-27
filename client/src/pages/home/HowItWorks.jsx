import { motion } from "framer-motion";
import {
  FiPackage,
  FiShoppingCart,
  FiBarChart2,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    icon: <FiPackage />,
    title: "Add Your Products",
    description:
      "Create products with pricing, categories and stock levels. Organise your inventory in minutes.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <FiShoppingCart />,
    title: "Record Sales & Orders",
    description:
      "Every sale instantly updates inventory, keeping stock accurate without manual calculations.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <FiBarChart2 />,
    title: "Track Business Growth",
    description:
      "Monitor revenue, best-selling products, low-stock alerts and business performance from one dashboard.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            How It Works
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Inventory Management
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto">
            Inventra simplifies inventory and sales management into three
            powerful steps so businesses can focus on growth instead of
            spreadsheets.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 mt-20">

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -12 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color}
                flex items-center justify-center text-3xl text-white shadow-lg`}
              >
                {step.icon}
              </div>

              <div className="absolute top-6 right-6 text-5xl font-black text-white/5">
                0{index + 1}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {step.title}
              </h3>

              <p className="mt-5 text-slate-400 leading-8">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 text-cyan-400 text-3xl">
                  <FiArrowRight />
                </div>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}