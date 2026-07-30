import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(async (config) => {

  const user = auth.currentUser;

  console.log("API REQUEST USER:", user);


  if (user) {

    const token = await user.getIdToken();

    console.log(
      "TOKEN GENERATED:",
      token.substring(0,30) + "..."
    );


    config.headers.Authorization = `Bearer ${token}`;

  } else {

    console.log("NO FIREBASE USER FOUND");

  }


  return config;

});


export default api;