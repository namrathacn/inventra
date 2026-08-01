import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiBarChart2,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
  FiPackage,
  FiChevronRight,
  FiBarChart,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function Sidebar() {

 const { user, logout } = useAuth();
const navigate = useNavigate();
console.log("SIDEBAR USER:", user);
  console.log("SIDEBAR ROLE:", user?.role);

const menuItems = [

    {
      name:"Dashboard",
      path:"/dashboard",
      icon: FiHome
    },

    {
      name:"Products",
      path:"/products",
      icon:FiPackage
    },

    {
      name:"Orders",
      path:"/orders",
      icon:FiShoppingCart
    },

    {
      name:"Reports",
      path:"/reports",
      icon:FiBarChart
    },


   ...(user?.role === "admin"
?
[
{
  name:"Staff",
  path:"/staff",
  icon:FiUsers
},
{
  name:"Settings",
  path:"/settings",
  icon:FiSettings
}
]
:
[])
  ];
console.log("MENU ITEMS:", menuItems);
  return (
    <motion.aside
      initial={{
        x: -80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        border-r
        border-white/10
        bg-[#06101d]/95
        backdrop-blur-3xl
        overflow-hidden
      "
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="
            absolute
            -left-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-sky-500/15
            blur-3xl
          "
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="
            absolute
            right-[-120px]
            bottom-[-120px]
            h-80
            w-80
            rounded-full
            bg-indigo-500/15
            blur-3xl
          "
        />

      </div>

      <div className="relative z-10 flex h-full flex-col">

        {/* Logo */}

        <div className="px-6 pt-6 pb-5">

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="flex items-center gap-4"
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-sky-500
                via-blue-500
                to-indigo-600
                shadow-xl
                shadow-sky-500/20
              "
            >
              <FiPackage className="text-3xl text-white" />
            </div>

            <div>

              <h1 className="text-3xl font-black text-white">
                Inventra
              </h1>

              <p
                className="
                  mt-1
                  text-[10px]
                  uppercase
                  tracking-[0.30em]
                  text-sky-400
                "
              >
                Smart Inventory
              </p>

            </div>

          </motion.div>

        </div>

        {/* Navigation */}

        <motion.nav
  variants={container}
  initial="hidden"
  animate="show"
  className="
  flex-1
  overflow-y-auto
  px-4
  space-y-2
  pb-6
  mb-2
"
>
                    {menuItems.map((menu) => {
            const Icon = menu.icon;

            return (
              <motion.div
                key={menu.name}
                variants={item}
              >
                <NavLink to={menu.path}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{
                        x: 5,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className={`
                        group
                        relative
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        px-4
                        py-3
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "border border-sky-400/20 bg-white/10 text-white shadow-lg shadow-sky-500/10"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-sidebar"
                          className="
                            absolute
                            left-0
                            top-2
                            bottom-2
                            w-1
                            rounded-full
                            bg-gradient-to-b
                            from-sky-400
                            to-blue-500
                          "
                        />
                      )}

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          transition-all

                          ${
                            isActive
                              ? "bg-sky-500/20 text-sky-300"
                              : "bg-white/5"
                          }
                        `}
                      >
                        <Icon className="text-lg" />
                      </div>

                      <span className="flex-1 font-medium">
                        {menu.name}
                      </span>

                      <FiChevronRight
                        className={`
                          text-sm
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }
                        `}
                      />
                    </motion.div>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* User Card */}

       <div className="px-4 pb-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="
  rounded-2xl
  border
  border-white/10
  bg-white/[0.06]
  backdrop-blur-2xl
  shadow-xl
  shadow-sky-500/10
  px-3
  py-2.5
"
          >
            <div className="flex items-center gap-3">

  {user?.photoURL ? (
    <img
      src={user.photoURL}
      alt="Profile"
      className="
        h-10
        w-10
        rounded-xl
        object-cover
        border
        border-white/10
        shrink-0
      "
    />
  ) : (
    <div
      className="
        h-11
        w-11
        rounded-xl
        bg-gradient-to-br
        from-pink-500
        via-purple-500
        to-indigo-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        text-sm
        shrink-0
      "
    >
      {(user?.displayName || user?.email || "A")
        .charAt(0)
        .toUpperCase()}
    </div>
  )}

  <div className="min-w-0 flex-1">

    <p className="truncate text-[13px] font-semibold text-white">
      {user?.name || user?.displayName || "User"}
    </p>

    <p className="truncate text-[10px] text-slate-400">
      {user?.email || "admin@inventra.com"}
    </p>

  </div>

</div>

        <div
  className="
    mt-2
    rounded-xl
    border
    border-cyan-400/20
    bg-gradient-to-r
    from-cyan-500/10
    to-blue-500/10
    py-1.5
    text-center
    text-[9px]
    font-semibold
    uppercase
    tracking-[0.22em]
    text-cyan-300
  "
>
  
  {user?.role === "admin"
  ? "Administrator"
  : "Staff Member"}
</div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                py-2
                text-[13px]
                font-semibold
                text-red-300
                transition-all
                hover:bg-red-500/20
              "
            >
              <FiLogOut />
              Logout
            </motion.button>

          </motion.div>

        </div>

      </div>

    </motion.aside>
  );
}