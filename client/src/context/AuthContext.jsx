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
  auth,
  googleProvider
} from "../firebase";



const AuthContext = createContext();




export function AuthProvider({children}){


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);





useEffect(()=>{


const unsubscribe =
onAuthStateChanged(
auth,
(currentUser)=>{


setUser(currentUser);

setLoading(false);


});


return unsubscribe;


},[]);







// GOOGLE LOGIN

const googleLogin = async () => {
  try {
    console.log("1. Opening Google popup");

    const result = await signInWithPopup(auth, googleProvider);

    console.log("2. Google login successful");

    const user = result.user;

    const token = await user.getIdToken();

    console.log("3. Token received");

    console.log("API URL:", import.meta.env.VITE_API_URL);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("4. Response Status:", response.status);

    const data = await response.json();

    console.log("5. Response:", data);

    setUser(user);

    return user;
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
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









return(


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