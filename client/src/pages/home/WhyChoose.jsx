import { motion } from "framer-motion";
import {
  FiShield,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiDatabase,
  FiClock,
} from "react-icons/fi";

const features = [
  {
    icon: <FiZap />,
    title: "Real-Time Inventory",
    description:
      "Inventory updates instantly whenever sales or orders are recorded.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <FiTrendingUp />,
    title: "Business Analytics",
    description:
      "Visual dashboards help you monitor revenue, products and performance.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <FiUsers />,
    title: "Role-Based Access",
    description:
      "Admins and staff receive different permissions for improved security.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FiShield />,
    title: "Secure Authentication",
    description:
      "Firebase Authentication keeps business accounts safe and protected.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FiDatabase />,
    title: "Cloud Storage",
    description:
      "Your inventory and orders stay synced securely in the cloud.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <FiClock />,
    title: "Save Time",
    description:
      "Reduce manual work with automated stock updates and reporting.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            Why Choose Inventra
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Built For Modern
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Inventory Management
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            Inventra combines inventory management, sales tracking and
            business analytics into one fast, secure and easy-to-use platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {features.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color}
                flex items-center justify-center text-white text-3xl`}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-5 text-slate-400 leading-8">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}