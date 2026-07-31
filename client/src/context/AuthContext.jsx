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





useEffect(()=>{


const unsubscribe = onAuthStateChanged(
auth,
async(currentUser)=>{


if(currentUser){


const userRef =
doc(
db,
"users",
currentUser.uid
);


const snap =
await getDoc(userRef);



if(snap.exists()){


setUser({

...currentUser,

...snap.data()

});


}
else{


setUser(currentUser);


}


}
else{


setUser(null);


}


setLoading(false);


});


return unsubscribe;


},[]);







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


uid:
currentUser.uid,


name:
currentUser.displayName,


email:
currentUser.email,


role:
"new"



}
);


}



return currentUser;


};









// CREATE BUSINESS


const createBusiness = async(data)=>{


const {

businessName,

pin

}=data;



const businessRef =
await addDoc(
collection(db,"businesses"),
{


businessName,


pin,


ownerId:
auth.currentUser.uid,


createdAt:
serverTimestamp()


}
);





await setDoc(

doc(
db,
"users",
auth.currentUser.uid
),

{


uid:
auth.currentUser.uid,


name:
auth.currentUser.displayName,


email:
auth.currentUser.email,


role:
"admin",


businessId:
businessRef.id


}


);



setUser({

...auth.currentUser,


role:"admin",


businessId:
businessRef.id


});



};









// JOIN BUSINESS STAFF


const joinBusiness = async(data)=>{


const {

pin

}=data;





const q =
query(

collection(db,"businesses"),

where(
"pin",
"==",
pin
)

);



const result =
await getDocs(q);



if(result.empty){

throw new Error(
"Invalid Business PIN"
);

}




const business =
result.docs[0];






await setDoc(

doc(
db,
"users",
auth.currentUser.uid
),

{


uid:
auth.currentUser.uid,


name:
auth.currentUser.displayName,


email:
auth.currentUser.email,


role:
"staff",


businessId:
business.id


}


);




setUser({

...auth.currentUser,


role:"staff",


businessId:
business.id


});



};









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

createBusiness,

joinBusiness,

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