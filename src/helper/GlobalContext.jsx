import { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { date } from "yup";

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
  const [updateUser, setUpdateUser] = useState("")
  // option selection role inside the form.
  // i also use it  to replace  value  in the form update/add.
  // and to show/not show password input.
  const [optionSelection, setOptionSelection] = useState(false)

  // to set the option between addSubmit or updateSubmit
  const [addSubmit, setAddSubmit] = useState(true)

  // get the id from the table  need to delete it 
  // const [id, setId] = useState("")

  async function loginAdmin(formData) {
    try {
      const { data } = await axios.post(`${url}/login`, formData, {
        withCredentials: true,
      });
      if (!data.success) throw new Error("don't success to login");
    } catch (error) { }
  }

  async function checkToken() {
    try {
      console.log("hi");
      const { data } = await axios.get(`${url}/auth`, {
        withCredentials: true,
      });
      console.log(data);
      if (!data) throw new Error("There is token");
      console.log("after the if");
      setShow(true);
      console.log(show, "token");
    } catch (error) { }
  }

  async function getSuperUser() {
    try {
      console.log("hi");
      const { data } = await axios.get(`${url}/getSuperUser`, {
        withCredentials: true,
      });
      setUserData(data.allUser);
      console.log(data);
      if (!data) throw new Error("There is not Admin/Manager");
    } catch (error) { }
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
    } catch (error) { }
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
      const { _id, admin_password } = updateUser

      // cant send the server info without password.
      // i wil add it to the values
      // Combine info values with admin_password
      const updatedValues = { ...values, admin_password };

      // console.log(_id , " the id i send to server")
      const response = await axios.put(`${url}/updateSuperUser/${_id}`, updatedValues, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you might need, like authorization token
        },
      });
      
      setSendReq((prev) => !prev);
      //there is problem with the massage i get from the server
      setMessage(response.data.message);

    } catch (error) {
      
      setMessage(response.data.message);
    }
    finally {
      //  set the selection to is normal 
      setOptionSelection(false)
      // set back  the button submit to add and not to update 
      setAddSubmit(true)
    }

   // and need to re render the table !!!!

  }

  useEffect(() => {
    checkToken();
    getSuperUser();
    setUpdateUser("");
  }, [sendReq]);

  //global context stuck
  const value = {
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
    setAddSubmit


  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
export default GlobalProvider;
