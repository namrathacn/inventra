import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import {
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  signOut
} from "firebase/auth";


import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";


import {
  auth,
  googleProvider,
  db
} from "../firebase";



const AuthContext = createContext();



export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const unsubscribe = onAuthStateChanged(
      auth,
      async(currentUser)=>{


        if(currentUser){


          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );


          const userSnap = await getDoc(
            userRef
          );



          if(userSnap.exists()){


            const profileData =
              userSnap.data();



            setUser({

              ...currentUser,

              ...profileData

            });



          }
          else{


            const newUser={

              uid:currentUser.uid,

              name:
                currentUser.displayName ||
                "User",

              email:
                currentUser.email,

              role:"admin"

            };


            await setDoc(
              userRef,
              newUser
            );


            setUser({

              ...currentUser,

              ...newUser

            });


          }



        }
        else{


          setUser(null);


        }


        setLoading(false);


      }
    );


    return unsubscribe;


  }, []);







  // GOOGLE LOGIN

  const googleLogin = async()=>{


    try{


      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );


      const currentUser =
        result.user;



      const userRef =
        doc(
          db,
          "users",
          currentUser.uid
        );



      const userSnap =
        await getDoc(
          userRef
        );



      let profileData;



      if(!userSnap.exists()){


        profileData={

          uid:
            currentUser.uid,

          name:
            currentUser.displayName ||
            "User",

          email:
            currentUser.email,

          role:"admin"

        };



        await setDoc(
          userRef,
          profileData
        );


      }
      else{


        profileData =
          userSnap.data();


      }




      setUser({

        ...currentUser,

        ...profileData

      });



      return currentUser;



    }
    catch(error){


      console.log(
        "Google Login Error:",
        error
      );


      throw error;


    }


  };







  // LOGOUT

  const logout = async()=>{


    await signOut(auth);

    setUser(null);


  };







  // UPDATE PROFILE

  const updateUser = async(newData)=>{


    if(auth.currentUser){


      await updateProfile(
        auth.currentUser,
        newData
      );


      setUser({

        ...user,

        ...newData

      });


    }


  };








  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        googleLogin,

        logout,

        updateUser

      }}

    >

      {children}

    </AuthContext.Provider>

  );


}







export function useAuth(){

  return useContext(AuthContext);

}