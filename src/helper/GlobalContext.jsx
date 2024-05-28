import { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { date } from "yup";
import ProductProvider from "./ProductContext.jsx";
import ClientProvider from "./ClientContext.jsx";

const url = "http://localhost:3000/user";

export const globalContext = createContext();
// aaa
function GlobalProvider({ children }) {
  // this show/hide component (form/nav etc)
  const [show, setShow] = useState(false);
  //  pop up the model with the from add/update
  const [showModal, setShowModal] = useState(false);
  // this controlling the req to the server
  const [sendReq, setSendReq] = useState(false);
  // this get all user form the server
  const [userData, setUserData] = useState("");
  // State to store the message
  const [message, setMessage] = useState("");
  // contain all the date to put in the form
  const [updateUser, setUpdateUser] = useState("");
  // option selection role inside the form.
  // i also use it  to replace  value  in the form update/add.
  // and to show/not show password input.
  const [optionSelection, setOptionSelection] = useState(false);

  // to set the option between addSubmit or updateSubmit
  const [addSubmit, setAddSubmit] = useState(true);

  // set the roll when log in  admin - can get to management 
  // when we using a function inside the useState its ect like useEffect with []
  // and do it only 1 time 
  const [adminRole,setAdminRole]= useState(() => {
    return localStorage.getItem('adminRole') || '';
  });
  

  async function loginAdmin(formData) {
    try {
      const { data } = await axios.post(`${url}/login`, formData, {
        withCredentials: true,
      });
       // get the admin_role from data 
      const role = data.admin.admin_role
      // inset the admin role in local storage
      // if i refresh i lose it this why i insert it in local storage
      localStorage.setItem('adminRole', role);
      localStorage.setItem('token',true);
      // insert the role to use state
      setAdminRole(data.admin.admin_role)

      if (!data.success) throw new Error("don't success to login");
    } catch (error) {}
  }
  async function logOut(){
    try {
     const {data} = await axios.get(`${url}/logout`,{withCredentials:true});
    
     if(data.success){
      setShow(false);
     }
    } catch (error) {
      console.log(error)
    }
  }
  async function checkToken() {
    try {
      if(!localStorage.getItem("token")) return;
      const { data } = await axios.get(`${url}/auth`, {
        withCredentials: true,
      });
      console.log(data);
      if (!data) throw new Error("There is token");
      console.log("after the if");
      setShow(true);
      console.log(show, "token");
    } catch (error) {
      if(localStorage.getItem("token")) localStorage.removeItem("token");
    }
  }




  async function addSuperUser(formData) {
    try {
      const { data } = await axios.post(`${url}/addSuperUser`, formData, {
        withCredentials: true,
      });
      setSendReq((prev) => !prev);
      setMessage(data.message);
      // console.log(data)
      return data;
    } catch (error) {}
    setMessage("An error occurred while adding admin or manager.!");
  }

  async function deleteSuperUser(id) {
    try {
      const { data } = await axios.delete(`${url}/deleteSuperUser/${id}`);
      setSendReq((prev) => !prev);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function upDateSuperUser(values) {
    try {
      // get the id and admin_password
      const { _id, admin_password } = updateUser;

      // cant send the server info without password.
      // i wil add it to the values
      // Combine info values with admin_password
      const updatedValues = { ...values, admin_password };

      // console.log(_id , " the id i send to server")
      const response = await axios.put(
        `${url}/updateSuperUser/${_id}`,
        updatedValues,
        {
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you might need, like authorization token
          },
        }
      );

      setSendReq((prev) => !prev);
      //there is problem with the massage i get from the server
      setMessage(response.data.message);
    } catch (error) {
      setMessage(response.data.message);
    } finally {
      //  set the selection to is normal
      setOptionSelection(false);
      // set back  the button submit to add and not to update
      setAddSubmit(true);
    }

    // and need to re render the table !!!!
  }

  useEffect(() => {
    checkToken();
  }, []);

  
  useEffect(() => {
    setUpdateUser("");
  }, [sendReq]);

  //global context stuck
  const value = {
    adminRole,
    show,
    setShow,
    loginAdmin,
    showModal,
    setShowModal,
    addSuperUser,
    userData,
    message,
    setMessage,
    deleteSuperUser,
    upDateSuperUser,
    updateUser,
    setOptionSelection,
    optionSelection,
    setUpdateUser,
    addSubmit,
    setAddSubmit,
    setAdminRole,
    logOut,
    sendReq,
    setUserData
  };

  return (
    <globalContext.Provider value={value}>
      <ClientProvider>
        <ProductProvider>{children}</ProductProvider>
      </ClientProvider>
    </globalContext.Provider>
  );
}
export default GlobalProvider;
