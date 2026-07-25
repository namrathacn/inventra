import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiPackage,
  FiShoppingCart,
  FiBarChart,
  FiEdit
} from "react-icons/fi";

import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";



export default function Profile() {


  const { user } = useAuth();



  const username =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Inventra User";



  return (


    <DashboardLayout>


      <div className="space-y-8">



        {/* PROFILE HEADER */}


        <motion.div

          initial={{opacity:0,y:20}}

          animate={{opacity:1,y:0}}

          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
          "

        >


          <div className="
          flex
          flex-col
          md:flex-row
          items-center
          gap-6
          ">



            {

              user?.photoURL ?


              <img

                src={user.photoURL}

                alt="Profile"

                className="
                h-28
                w-28
                rounded-full
                object-cover
                border
                border-white/20
                "

              />


              :


              <div className="
              h-28
              w-28
              rounded-full
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              flex
              items-center
              justify-center
              ">


                <FiUser className="
                text-5xl
                text-white
                "/>


              </div>


            }





            <div>


              <h1 className="
              text-3xl
              font-bold
              text-white
              ">

                {username}

              </h1>



              <p className="
              text-slate-400
              mt-2
              ">

                {user?.email}

              </p>



              <span className="
              inline-block
              mt-4
              rounded-full
              bg-green-500/20
              px-4
              py-2
              text-sm
              text-green-400
              ">

                Active Account

              </span>


            </div>





            <button className="
            md:ml-auto
            flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            text-white
            hover:bg-cyan-400
            transition
            ">

              <FiEdit/>

              Edit Profile


            </button>




          </div>



        </motion.div>







        {/* DETAILS */}



        <div className="
        grid
        md:grid-cols-2
        gap-6
        ">




          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          ">


            <h2 className="
            text-xl
            font-bold
            text-white
            mb-6
            ">

              Personal Details

            </h2>





            <div className="space-y-6">



              <Info

              icon={<FiMail/>}

              title="Email"

              value={user?.email}

              />



              <Info

              icon={<FiShield/>}

              title="Authentication"

              value="Firebase Verified"

              />



              <Info

              icon={<FiCalendar/>}

              title="Joined"

              value={
                user?.metadata?.creationTime || 
                "Recently"
              }

              />




            </div>



          </div>









          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          ">



            <h2 className="
            text-xl
            font-bold
            text-white
            mb-6
            ">

              Account Status

            </h2>




            <div className="
            rounded-2xl
            bg-green-500/10
            p-5
            ">


              <h3 className="
              text-green-400
              font-semibold
              ">

                Verified User

              </h3>



              <p className="
              text-slate-300
              text-sm
              mt-2
              ">

                Your Inventra account is active and secure.

              </p>


            </div>




          </div>





        </div>








        {/* STAT CARDS */}



        <div className="
        grid
        md:grid-cols-3
        gap-6
        ">




          <StatCard

          icon={<FiPackage/>}

          title="Products"

          value="421"

          />




          <StatCard

          icon={<FiShoppingCart/>}

          title="Orders"

          value="267"

          />




          <StatCard

          icon={<FiBarChart/>}

          title="Reports"

          value="18"

          />




        </div>





      </div>



    </DashboardLayout>


  );

}







function Info({icon,title,value}){


return (

<div className="
flex
items-center
gap-4
">


<div className="
text-cyan-400
text-xl
">

{icon}

</div>


<div>

<p className="
text-sm
text-slate-400
">

{title}

</p>


<p className="
text-white
">

{value}

</p>


</div>


</div>

);


}








function StatCard({icon,title,value}){


return(

<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
hover:bg-white/10
transition
">


<div className="
text-3xl
text-cyan-400
">

{icon}

</div>


<h3 className="
text-slate-400
mt-4
">

{title}

</h3>


<p className="
text-3xl
font-bold
text-white
mt-2
">

{value}

</p>


</div>

);


}