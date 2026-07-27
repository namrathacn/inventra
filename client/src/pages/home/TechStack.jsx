import { motion } from "framer-motion";

import {
  FaReact,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiVite,
  SiTailwindcss,
  SiFirebase,
  SiExpress,
  SiMongodb,
  SiFramer,
} from "react-icons/si";


const tech = [
  {
    name: "React",
    icon: <FaReact className="text-sky-400 text-5xl" />,
  },
  {
    name: "Vite",
    icon: <SiVite className="text-violet-400 text-5xl" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400 text-5xl" />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase className="text-yellow-400 text-5xl" />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-400 text-5xl" />,
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-300 text-5xl" />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500 text-5xl" />,
  },
  {
    name: "Framer Motion",
    icon: <SiFramer className="text-pink-400 text-5xl" />,
  },
];


export default function TechStack() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            Powered By
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Modern
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            Inventra is built using modern web technologies that deliver
            speed, security and scalability.
          </p>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

          {tech.map((item) => (

            <motion.div
              key={item.name}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{
                duration: 0.3,
              }}
              className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 text-center"
            >

              <div className="flex justify-center">
                {item.icon}
              </div>


              <h3 className="mt-6 text-xl font-bold">
                {item.name}
              </h3>


            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}