import { motion } from "framer-motion";
import {
  FiStar,
  FiTrendingUp,
  FiPackage,
} from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Retail Store Owner",
    company: "Demo Business",
    review:
      "Inventra made managing our inventory incredibly simple. Low-stock alerts helped us avoid running out of our best-selling products.",
    stat: "40% fewer stockouts",
    icon: <FiPackage />,
  },
  {
    name: "Michael Chen",
    role: "Warehouse Manager",
    company: "Demo Warehouse",
    review:
      "The dashboard gives us instant visibility into orders, stock levels and revenue. Everything we need is in one place.",
    stat: "2× faster tracking",
    icon: <FiTrendingUp />,
  },
  {
    name: "Emma Wilson",
    role: "Online Seller",
    company: "Demo Store",
    review:
      "Recording sales automatically updates inventory, saving hours every week. It's exactly what a growing business needs.",
    stat: "95% inventory accuracy",
    icon: <FiPackage />,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-cyan-400 font-semibold">
            Testimonials
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Trusted by
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto">
            These are demonstration testimonials showcasing how Inventra
            helps businesses manage inventory more efficiently.
          </p>

          <p className="mt-3 text-sm text-yellow-400">
            * Demo content for portfolio presentation.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="
              rounded-3xl
              bg-white/5
              border
              border-white/10
              backdrop-blur-xl
              p-8
              relative
              overflow-hidden"
            >

              <div className="flex gap-1 text-yellow-400 text-lg">
                <FiStar />
                <FiStar />
                <FiStar />
                <FiStar />
                <FiStar />
              </div>

              <p className="mt-6 text-slate-300 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="
                w-14
                h-14
                rounded-full
                bg-gradient-to-br
                from-cyan-500
                to-blue-500
                flex
                items-center
                justify-center
                text-2xl
                text-white">
                  {item.icon}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {item.role}
                  </p>

                  <p className="text-cyan-400 text-sm">
                    {item.company}
                  </p>

                </div>

              </div>

              <div className="
              mt-8
              rounded-2xl
              bg-cyan-500/10
              border
              border-cyan-500/20
              p-5">

                <p className="text-cyan-300 text-sm">
                  Business Improvement
                </p>

                <h3 className="text-2xl font-black mt-2">
                  {item.stat}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}