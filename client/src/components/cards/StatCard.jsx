import { motion } from "framer-motion";


export default function StatCard({
  title,
  value = 0,
  prefix = "",
  change = "",
  color = "#3B82F6",
  icon
}) {


  return (

    <motion.div

      whileHover={{
        y:-8,
        scale:1.03
      }}

      transition={{
        duration:0.25
      }}

      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      backdrop-blur-xl
      "

    >


      <div

        className="
        absolute
        -right-10
        -top-10
        h-36
        w-36
        rounded-full
        blur-3xl
        opacity-30
        "

        style={{
          background:color
        }}

      />



      <div className="
      relative
      flex
      items-center
      justify-between
      ">


        <div>


          <p className="
          text-sm
          text-slate-400
          ">

            {title}

          </p>



          <h2 className="
          mt-3
          text-4xl
          font-bold
          text-white
          ">

            {prefix}{Number(value).toLocaleString()}


          </h2>



          <p className="
          mt-3
          text-sm
          font-semibold
          text-emerald-400
          ">

            ↑ {change}

          </p>


        </div>




        <div

          className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          text-3xl
          "

          style={{
            background:`${color}25`,
            color:color
          }}

        >

          {icon}


        </div>



      </div>



      <motion.div

        animate={{
          x:["-100%","100%"]
        }}

        transition={{
          duration:3,
          repeat:Infinity,
          repeatDelay:2
        }}

        className="
        absolute
        bottom-0
        left-0
        h-[2px]
        w-full
        bg-white/30
        "

      />


    </motion.div>

  );

}