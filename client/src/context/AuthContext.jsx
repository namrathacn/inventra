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
      async (currentUser) => {


        if (currentUser) {


          const userSnap = await getDoc(
            doc(
              db,
              "users",
              currentUser.uid
            )
          );



          if (userSnap.exists()) {


            const profileData = userSnap.data();


            console.log(
              "PROFILE DATA:",
              profileData
            );
            console.log(
  "ROLE CHECK:",
  profileData.role
);


            setUser({
  ...profileData,
  ...currentUser
});


          } else {


            setUser(currentUser);


          }


        } else {


          setUser(null);


        }


        setLoading(false);


      }
    );


    return unsubscribe;


  }, []);





  // GOOGLE LOGIN

  const googleLogin = async () => {


    try {


      const result = await signInWithPopup(
        auth,
        googleProvider
      );


      const currentUser = result.user;


      const userRef = doc(
        db,
        "users",
        currentUser.uid
      );


      const userSnap = await getDoc(
        userRef
      );



      if (!userSnap.exists()) {


        await setDoc(
          userRef,
          {

            uid: currentUser.uid,

            name:
              currentUser.displayName ||
              "User",

            email:
              currentUser.email,

            role:"admin"

          }
        );


      }



      setUser(currentUser);


      return currentUser;



    } catch(error) {


      console.log(
        "Google Login Error:",
        error
      );


      throw error;


    }


  };






  // LOGOUT

  const logout = async()=>{


    try{


      await signOut(auth);

      setUser(null);


    }
    catch(error){


      console.log(error);


    }


  };







  // UPDATE PROFILE

  const updateUser = async(newData)=>{


    try{


      if(auth.currentUser){


        await updateProfile(
          auth.currentUser,
          newData
        );


        setUser({

          ...auth.currentUser,

          ...newData

        });


      }


    }
    catch(error){


      throw error;


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