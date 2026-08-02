import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import {
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";


import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from "firebase/firestore";


import {
  auth,
  googleProvider,
  db
} from "../firebase";



const AuthContext = createContext();



export function AuthProvider({children}){


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);





useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (currentUser) => {

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {

        const profile = snap.data();

        console.log("FIRESTORE PROFILE:", profile);

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: profile.name,
          role: profile.role,
          businessId: profile.businessId,
          photoURL: currentUser.photoURL,
        });

      } else {

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });

      }

      setLoading(false);

    }
  );

  return unsubscribe;

}, []);







// GOOGLE LOGIN


const googleLogin = async()=>{


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



const snap =
await getDoc(userRef);



if(!snap.exists()){

await setDoc(
userRef,
{

uid: currentUser.uid,

name: currentUser.displayName,

email: currentUser.email,

role: "admin",

createdAt: serverTimestamp()

}
);

}



return currentUser;


};









// CREATE BUSINESS












// JOIN BUSINESS STAFF












const logout = async()=>{

await signOut(auth);

setUser(null);

};








return(

<AuthContext.Provider

value={{
  user,
  loading,
  googleLogin,
  logout
}}

>


{children}


</AuthContext.Provider>


);


}







export function useAuth(){

return useContext(AuthContext);

}