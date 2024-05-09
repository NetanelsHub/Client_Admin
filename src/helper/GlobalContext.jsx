import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { date } from "yup";

const url = "http://localhost:3000/user";
export const globalContext = createContext();
// aaa
function GlobalProvider({ children }) {
  // this show/hide component (form/nav etc)
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // this controlling the req to the server
  const [sendReq, setSendReq] = useState(false);
  // this get all user form the server
  const [userData, setUserData] = useState("");

  // State to store the message
  const [message, setMessage] = useState("");

  async function loginAdmin(formData) {
    try {
      const { data } = await axios.post(`${url}/login`, formData, {
        withCredentials: true,
      });
      if (!data.success) throw new Error("don't success to login");
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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

  useEffect(() => {
    checkToken();
    getSuperUser();
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
    deleteSuperUser

  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}
export default GlobalProvider;
