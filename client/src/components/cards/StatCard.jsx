import { motion } from "framer-motion";
import { useCurrency } from "../../context/CurrencyContext";


export default function StatCard({
  title,
  value,
  icon,

  isCurrency = false,

  glowColor = "bg-cyan-500",
  iconBackground = "bg-cyan-500/20",
  iconColor = "text-cyan-400"
}) {


  const {
    formatCurrency
  } = useCurrency();



  const displayValue = isCurrency
    ? formatCurrency(value)
    : value;



  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}

      whileHover={{
        y: -8,
        scale: 1.03
      }}

      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      backdrop-blur-xl
      shadow-xl
      "
    >



      {/* Corner Glow */}

      <div
        className={`
        absolute
        -right-16
        -top-16
        h-44
        w-44
        rounded-full
        ${glowColor}
        opacity-30
        blur-3xl
        `}
      />




      <div
        className="
        relative
        z-10
        flex
        items-start
        justify-between
        "
      >



        {/* Content */}

        <div className="min-w-0">


          <p
            className="
            text-sm
            font-semibold
            text-slate-400
            "
          >
            {title}
          </p>




          <motion.h2

            initial={{
              opacity: 0,
              scale: 0.8
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            transition={{
              delay: 0.2
            }}

            className="
            mt-3
            whitespace-nowrap
            text-3xl
            lg:text-4xl
            font-extrabold
            tracking-tight
            text-white
            "
          >

            {displayValue}

          </motion.h2>



        </div>






        {/* Icon */}

        <motion.div

          whileHover={{
            rotate: 10,
            scale: 1.1
          }}

          className={`
          flex
          h-16
          w-16
          shrink-0
          items-center
          justify-center
          rounded-2xl
          ${iconBackground}
          ${iconColor}
          border
          border-white/10
          text-3xl
          shadow-lg
          `}
        >

          {icon}

        </motion.div>



      </div>



    </motion.div>


  );

}