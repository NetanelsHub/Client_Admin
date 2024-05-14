import { createContext, useState } from "react";
import axios from "axios";

export const productContext = createContext();

const url = "http://localhost:3000/products";

function ProductProvider({ children }) {
    // for the model of from - add product
    const [showModal, setShowModal] = useState(false);
    // for the textArea to get it and reset it 
    const [text,setText] = useState("")
    //  to get the category input user select
    const [selectedCategory, setSelectedCategory] = useState('');
    //  to get the file in add product form
    const [selectedFile, setSelectedFile] = useState("");

    async function addProduct(formData) {
        try {
            console.log("form info:",formData)
          const { data } = await axios.post(`${url}/add`, formData, {
            withCredentials: true,
          });
          
      
          setMessage(data.message);
          // Uncomment and use if you need to trigger any state changes
          // setSendReq((prev) => !prev);
          return data;
        } catch (error) {
          console.error("An error occurred while adding the product:", error);
          setMessage("An error occurred while adding the product.");
        }
      }
      

    // Global context state
    const value = {
        showModal,
        setShowModal,
        text,
        setText,
        selectedCategory,
        setSelectedCategory,
        selectedFile,
        setSelectedFile,
        addProduct
       
    };

    return (
        <productContext.Provider value={value}>
            {children}
        </productContext.Provider>
    );
}

export default ProductProvider;

