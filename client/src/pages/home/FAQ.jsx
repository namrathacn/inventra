import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiShield,
  FiUsers,
  FiSmartphone,
  FiDatabase,
  FiBarChart2,
} from "react-icons/fi";

const faqs = [
  {
    icon: <FiShield />,
    question: "Is my business data secure?",
    answer:
      "Yes. Inventra uses Firebase Authentication and secure cloud services to protect user accounts and inventory data. Only authorised users can access your business information.",
  },
  {
    icon: <FiUsers />,
    question: "Can multiple staff members use Inventra?",
    answer:
      "Absolutely. Admins can create staff accounts with role-based permissions so employees only access the features they need.",
  },
  {
    icon: <FiSmartphone />,
    question: "Does Inventra work on mobile devices?",
    answer:
      "Yes. Inventra is fully responsive, allowing business owners and staff to manage inventory from desktops, tablets and smartphones.",
  },
  {
    icon: <FiDatabase />,
    question: "How is inventory updated?",
    answer:
      "Whenever a sale or order is recorded, stock levels are automatically updated in real time. This helps reduce manual work and inventory errors.",
  },
  {
    icon: <FiBarChart2 />,
    question: "What insights does the dashboard provide?",
    answer:
      "The dashboard displays revenue trends, recent orders, best-selling products, stock levels and low-stock alerts so businesses can make better decisions.",
  },
];

function FAQItem({ faq, open, toggle }) {
  return (
    <motion.div
      layout
      className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-7 text-left"
      >
        <div className="flex items-center gap-5">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl text-white">
            {faq.icon}
          </div>

          <h3 className="text-xl font-bold">
            {faq.question}
          </h3>

        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
        >
          <FiChevronDown className="text-2xl text-cyan-400" />
        </motion.div>
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >

            <div className="px-7 pb-7 text-slate-400 leading-8">
              {faq.answer}
            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-32 px-6">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-cyan-400 font-semibold">
            FAQ
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Frequently Asked
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            Everything you need to know about using Inventra for inventory,
            sales and business management.
          </p>

        </motion.div>

        <div className="mt-20 space-y-6">

          {faqs.map((faq, index) => (

            <FAQItem
              key={faq.question}
              faq={faq}
              open={open === index}
              toggle={() =>
                setOpen(open === index ? -1 : index)
              }
            />

          ))}

        </div>

      </div>

    </section>
  );
}