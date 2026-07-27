import {
  FiPackage,
  FiGithub,
  FiLinkedin,
  FiArrowUp,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-white/[0.03] overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-500/10 blur-[140px]" />
      </div>


      <div className="relative max-w-7xl mx-auto px-6 py-20">


        <div className="grid lg:grid-cols-4 gap-12">


          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-4">

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                from-cyan-500
                to-blue-600
                flex
                items-center
                justify-center
                text-white
                text-3xl"
              >

                <FiPackage />

              </div>


              <div>

                <h2 className="text-3xl font-black">
                  Inventra
                </h2>

                <p className="text-cyan-400 tracking-[4px] text-xs uppercase">
                  Smart Inventory Platform
                </p>

              </div>

            </div>


            <p className="mt-8 text-slate-400 leading-8 max-w-md">

              A full stack inventory management dashboard built to help
              businesses track products, manage sales, analyse performance,
              and make smarter decisions using modern web technologies.

            </p>


            <div className="flex gap-4 mt-8">


              <a
                href="https://github.com/"
                target="_blank"
                className="
                w-12
                h-12
                rounded-xl
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
                hover:bg-cyan-500
                transition"
              >

                <FiGithub />

              </a>



              <a
                href="https://linkedin.com/"
                target="_blank"
                className="
                w-12
                h-12
                rounded-xl
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
                hover:bg-blue-500
                transition"
              >

                <FiLinkedin />

              </a>


            </div>


          </div>



          {/* Product */}


          <div>

            <h3 className="font-bold text-xl mb-6">
              Product
            </h3>


            <div className="space-y-4 text-slate-400">


              <p className="hover:text-cyan-400 cursor-pointer transition">
                Features
              </p>


              <p className="hover:text-cyan-400 cursor-pointer transition">
                Dashboard
              </p>


              <p className="hover:text-cyan-400 cursor-pointer transition">
                Analytics
              </p>


            </div>


          </div>




          {/* Project */}


          <div>

            <h3 className="font-bold text-xl mb-6">
              Project
            </h3>


            <div className="space-y-4 text-slate-400">


              <p className="hover:text-cyan-400 cursor-pointer transition">
                Overview
              </p>


              <p className="hover:text-cyan-400 cursor-pointer transition">
                Technology
              </p>


              <p className="hover:text-cyan-400 cursor-pointer transition">
                GitHub
              </p>


            </div>


          </div>


        </div>





        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">


          <p className="text-slate-500 text-center md:text-left">

            © 2026 Inventra. Built with React, Firebase & Node.js.

          </p>




          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
            w-12
            h-12
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex
            items-center
            justify-center
            hover:scale-110
            transition"
          >

            <FiArrowUp />

          </button>


        </div>



      </div>


    </footer>
  );
}