import { createContext, useState } from "react";

export const productContext = createContext();

function ProductProvider({ children }) {
    // for the model of from - add product
    const [showModal, setShowModal] = useState(false);
    // for the textArea to get it and reset it 
    const [text,setText] = useState("")
    //  to get the category input user select
    const [selectedCategory, setSelectedCategory] = useState('');

    // Global context state
    const value = {
        showModal,
        setShowModal,
        text,
        setText,
        selectedCategory,
        setSelectedCategory
       
    };

    return (
        <productContext.Provider value={value}>
            {children}
        </productContext.Provider>
    );
}

export default ProductProvider;

