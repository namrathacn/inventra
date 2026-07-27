import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiPackage,
  FiAlertTriangle,
  FiDollarSign,
} from "react-icons/fi";

const stats = [
  {
    title: "Revenue",
    value: "£24,580",
    icon: <FiDollarSign />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Orders",
    value: "1,248",
    icon: <FiShoppingCart />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Products",
    value: "438",
    icon: <FiPackage />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Low Stock",
    value: "12",
    icon: <FiAlertTriangle />,
    color: "from-orange-500 to-red-500",
  },
];

export default function DashboardPreview() {
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
            Dashboard Preview
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Everything Your Business
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Needs In One Dashboard
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-slate-400 text-lg">
            Monitor inventory, revenue, sales and stock levels from one
            beautiful dashboard designed for modern businesses.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
        >

          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">

            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-4 text-slate-400">
              inventra.app/dashboard
            </span>

          </div>

          <div className="p-8">

            <div className="grid md:grid-cols-4 gap-6">

              {stats.map((card) => (

                <div
                  key={card.title}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6"
                >

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color}
                  flex items-center justify-center text-2xl text-white`}>
                    {card.icon}
                  </div>

                  <p className="mt-5 text-slate-400">
                    {card.title}
                  </p>

                  <h3 className="text-3xl font-black mt-2">
                    {card.value}
                  </h3>

                </div>

              ))}

            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-10">

              <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">

                <h3 className="text-xl font-bold mb-6">
                  Revenue Overview
                </h3>

                <div className="flex items-end gap-4 h-56">

                  {[40,70,55,90,75,120,100,140].map((h,index)=>(

                    <motion.div
                      key={index}
                      initial={{height:0}}
                      whileInView={{height:h}}
                      transition={{delay:index*0.08}}
                      className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-500"
                    />

                  ))}

                </div>

              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

                <h3 className="text-xl font-bold mb-6">
                  Top Products
                </h3>

                {[
                  "iPhone 15",
                  "Samsung S25",
                  "MacBook Air",
                  "AirPods Pro",
                  "Apple Watch",
                ].map((item,index)=>(
                  <div
                    key={item}
                    className="flex justify-between py-4 border-b border-white/10"
                  >
                    <span>{item}</span>
                    <span className="text-cyan-400">
                      #{index+1}
                    </span>
                  </div>
                ))}

                <div className="mt-8 rounded-2xl bg-cyan-500/10 p-5 border border-cyan-500/20">

                  <div className="flex items-center gap-3">

                    <FiTrendingUp className="text-cyan-400 text-2xl"/>

                    <div>

                      <p className="text-slate-400">
                        Monthly Growth
                      </p>

                      <h3 className="text-3xl font-black text-cyan-400">
                        +18.5%
                      </h3>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}