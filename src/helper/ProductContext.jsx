import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { globalContext } from "./GlobalContext";

export const productContext = createContext();

const url = "http://localhost:3000/products";

function ProductProvider({ children }) {
    const {setMessage} = useContext(globalContext)

    // for the model of from - add product
    const [showModal, setShowModal] = useState(false);
    // for the textArea to get it and reset it 
    const [text,setText] = useState("")
    //  to get the category input user select
    const [selectedCategory, setSelectedCategory] = useState('');
    //  to get the file in add product form
    const [selectedFile, setSelectedFile] = useState("");
    // info all data products
    const [dataProduct,setDataProduct]= useState("")
    // for prev and re prev
    const [crudProduct,setCrudProduct] =useState(false)
    // to handel the update product from 
    const [productFrom,setProductForm] = useState ({
      product_name: '',
      product_description: '',
      product_price: '',
      product_amount:"",
      product_discount:"",
      product_image: "",
      product_category :""
    })
    // a flag to know if  user in product update etc or on add 
    const[isAdd , setIsAdd] = useState(true)
   
    

    async function addProduct(formData) {
        try {
            console.log("form info:",formData)
          const { data } = await axios.post(`${url}/add`, formData, {
            withCredentials: true,
          });
          
      
          setMessage(data.message);
          // Uncomment and use if you need to trigger any state changes
          setCrudProduct((prev) => !prev);

          return data;
        } catch (error) {
          console.error("An error occurred while adding the product:", error);
          setMessage("An error occurred while adding the product.");
        }
      }



    async function deleteProduct(id){
      try {
        const { data } = await axios.delete(`${url}/delete/${id}`);
        setCrudProduct((prev) => !prev);
        setMessage(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }

    async function updateProduct(formData,id){
      try {
        await axios.put(`${url}/update/${id}`,formData,{
          withCredentials: true,
        })
        setCrudProduct((prev) => !prev);
        //need to change it with thw message from the server
        setMessage("Product updated successfully")
      } catch (error) {
        setMessage("Error updating product")
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
        addProduct,
        dataProduct,
        deleteProduct,
        productFrom,
        setProductForm,
        isAdd , 
        setIsAdd,
        updateProduct,
        crudProduct
       
    };

    return (
        <productContext.Provider value={value}>
            {children}
        </productContext.Provider>
    );
}

export default ProductProvider;

