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

const googleLogin = async()=>{


try{


const result =
await signInWithPopup(
auth,
googleProvider
);



const user =
result.user;



setUser(user);



return user;



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