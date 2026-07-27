import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import {
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";


import {
  auth
} from "../firebase";



const AuthContext = createContext();



export function AuthProvider({children}){


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);




useEffect(()=>{


const unsubscribe = onAuthStateChanged(
auth,
(currentUser)=>{


setUser(currentUser);

setLoading(false);


}

);


return unsubscribe;


},[]);








const updateUser = async(newData)=>{


try{


if(auth.currentUser){


await updateProfile(
auth.currentUser,
newData
);



const updatedUser = {

...auth.currentUser,

displayName:newData.displayName

};



setUser(updatedUser);


}



}catch(error){


throw error;


}



};






return(

<AuthContext.Provider

value={{

user,

loading,

updateUser

}}

>


{children}


</AuthContext.Provider>


)

}




export function useAuth(){

return useContext(AuthContext);

}