import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalContext } from "./GlobalContext";

const url = "http://localhost:3000/client";

export const clientContext = createContext()

function ClientProvider({ children }) {

  const { setMessage } = useContext(globalContext)
  const [allClients, setAllClients] = useState([])
  // for prev and re prev
  const [crudClients, setCrudClients] = useState(false)



  async function addClient(values) {
    try {
      const data = await axios.post(`${url}/register`, values, {
        withCredentials: true,
      });
      setCrudClients((perv) => !perv)
      setMessage(data.message)
      return data;
    } catch (error) {
      console.error("An error occurred while adding the product:", error);
      setMessage("An error occurred while adding the product.");

    }
  }

  async function getClients() {
    try {
      const { data } = await axios.get(`${url}/getClients`, {
        withCredentials: true,
      });

      if (!data) throw new Error("There is not clients");

      setAllClients(data.allClients);

    } catch (error) {
      
    }
  }

  async function deleteClient(id){
    try {
      console.log("id:",id)
      const { data } = await axios.delete(`${url}/delete/${id}`);
      setCrudClients((perv) => !perv)
      // setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      // setMessage(data.message);
    }
  }
  const value = {
    addClient,
    getClients,
    allClients,
    setAllClients,
    crudClients,
    setCrudClients,
    deleteClient
  }

  useEffect(() => {
    getClients()
  }, [crudClients])

  return (
    <clientContext.Provider value={value}>{children}</clientContext.Provider>
  );
}

export default ClientProvider;