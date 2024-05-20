import { createContext, useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:3000/client";

export const clientContext = createContext()

function ClientProvider({ children }) {

    async function addClient(values) {
        try {
          const { data } = await axios.post(`${url}/register`, values, {
            withCredentials: true,
          });
          
      
          setMessage("add user good")
          // Uncomment and use if you need to trigger any state changes
        //   setCrudProduct((prev) => !prev);

          return data;
        } catch (error) {
          console.error("An error occurred while adding the product:", error);
          setMessage("An error occurred while adding the product.");
        }
      }

    const value = {
        addClient
    }

    return (
        <clientContext.Provider value={value}>{children}</clientContext.Provider>
      );
}

export default ClientProvider;