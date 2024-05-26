import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalContext } from "./GlobalContext";

const url = "http://localhost:3000/client";

export const clientContext = createContext();

function ClientProvider({ children }) {
  const { setMessage } = useContext(globalContext);
  // for client info
  const [allClients, setAllClients] = useState([]);
  // for prev and re prev
  const [crudClients, setCrudClients] = useState(false);
  // to know if we on add client - true , on update client - false
  const [onAddClient,setOnAddClient ] = useState(true)
  // get the client info from the table 
  const [clientInfo , setClientInfo] = useState("")

  async function addClient(values) {
    try {
      const data = await axios.post(`${url}/register`, values, {
        withCredentials: true,
      });
      setCrudClients((perv) => !perv);
      console.log(data);
      setMessage(data.message);
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
     console.log(data)
     
      setAllClients(data.allClients);
    } catch (error) {}
  }

  async function deleteClient(id) {
    try {
      console.log("id:", id);
      const { data } = await axios.delete(`${url}/delete/${id}`);
      setCrudClients((perv) => !perv);
      // setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      // setMessage(data.message);
    }
  }

  async function upDateClient(values) {
    try {
      // get the id and client_password
      const { _id, client_password } = clientInfo;
      // console.log(" in up date client")
      // cant send the server info without password.
      // i wil add it to the values
      // Combine info values with admin_password
      const updatedValues = { ...values, client_password };

      // console.log(_id , " the id i send to server")
      const response = await axios.put(`${url}/update/${_id}`,updatedValues)
      
      setCrudClients((prev) => !prev);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while update the client");
    } finally {
      //  set the selection to is normal
      // setOptionSelection(false);
      // set back  the button submit to add and not to update
      setOnAddClient(true);
    }

  
  }

  const value = {
    addClient,
    getClients,
    allClients,
    setAllClients,
    crudClients,
    setCrudClients,
    deleteClient,
    onAddClient,
    setOnAddClient,
    clientInfo ,
    setClientInfo,
    upDateClient,
    
  };

  useEffect(() => {
    getClients();
  }, [crudClients]);

  return (
    <clientContext.Provider value={value}>{children}</clientContext.Provider>
  );
}

export default ClientProvider;
