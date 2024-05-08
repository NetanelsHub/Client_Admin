import { createContext, useState,useEffect } from "react";
import axios from "axios";
import { date } from "yup";

const url = "http://localhost:3000/user";
export const globalContext = createContext();

function GlobalProvider({ children }) {
  // this show/hide component (form/nav etc)
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);


  
  async function loginAdmin(formData){
  try {
    const { data } = await axios.post(`${url}/login`, formData, {
      withCredentials: true,
    });
    if(!data.success) throw new Error("don't success to login");
  } catch (error) {}
};

  async function checkToken(){
  try {
    console.log("hi")
    const { data } = await axios.get(`${url}/auth`, {
      withCredentials: true,
    });
    console.log(data)
    if(!data) throw new Error("There is token");
    console.log("after the if")
    setShow(true)
    console.log(show,"token")
  } catch (error) {}
};

async function addSuperUser(formData){
  try {
    const { data } = await axios.post(`${url}/addSuperUser`, formData, {
      withCredentials: true,
    });

    console.log(data)
  } catch (error) {
    
  }
}

//   async function logOut(){
//   try {
//     console.log("by")
//     const { data } = await axios.get(`${url}/auth`, {
//       withCredentials: true,
//     });
//     console.log(data)
//     if(!data) throw new Error("There is token");
//     console.log("after the if")
//     setShow(true)
//     console.log(show,"token")
//   } catch (error) {}
// };

  useEffect(()=>{
    checkToken()
  },[])
  

  //global context stuck
  const value = {
    show,
    setShow,
    loginAdmin,
    showModal,
    setShowModal,
    addSuperUser

  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
export default GlobalProvider;
