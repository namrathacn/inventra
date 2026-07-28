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
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Products",
    path: "/products",
    icon: FiBox,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: FiShoppingCart,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FiBarChart2,
  },
  {
    name: "Staff",
    path: "/staff",
    icon: FiUsers,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: FiUser,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -25,
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
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        overflow-hidden
        border-r
        border-white/10
        bg-[#06101d]/95
        backdrop-blur-3xl
      "
    >
      {/* Animated Background */}

      <div className="absolute inset-0">

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 25, 0],
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
            rotate: [0, -25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="
            absolute
            right-[-140px]
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

        {/* Brand */}

        <div className="px-6 pt-8 pb-8">

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
                  text-[11px]
                  uppercase
                  tracking-[0.28em]
                  text-sky-400
                "
              >
                Smart Inventory
              </p>

            </div>

          </motion.div>

        </div>

        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          className="
            flex-1
            space-y-2
            px-4
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
                        x: 6,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className={`
                        relative
                        flex
                        items-center
                        gap-4
                        overflow-hidden
                        rounded-2xl
                        px-4
                        py-3
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-white/10 text-white border border-sky-400/20 shadow-lg shadow-sky-500/10"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
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

                          ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100"
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

        <div className="p-5">
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
              delay: 0.5,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-4
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-pink-500
                  via-purple-500
                  to-indigo-600
                  text-lg
                  font-bold
                  text-white
                "
              >
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 overflow-hidden">

                <p className="truncate font-semibold text-white">
                  {user?.name || "Admin"}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {user?.email || "admin@inventra.com"}
                </p>

              </div>

            </div>

            <div
              className="
                mt-4
                rounded-xl
                border
                border-sky-500/20
                bg-sky-500/10
                px-3
                py-2
                text-center
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-sky-300
              "
            >
              Store Manager
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
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                py-3
                font-semibold
                text-red-300
                transition
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