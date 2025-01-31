// form of add product --> Product

import React, { useContext } from 'react';
import Button from '../element/Button';
import Model from '../element/Model';
import Form from '../element/Form';
import { productContext } from '../../../../helper/ProductContext';
import Message from "../../../static/element/Message";
import {globalContext} from "../../../../helper/GlobalContext"

export default function AddProduct() {
    const { setShowModal ,setSelectedCategory,setProductForm, setIsAdd ,setSelectedFile} = useContext(productContext)
    const {message} = useContext(globalContext)

    function handleAddProduct(e) {
        //reset the update info from the form 
        setProductForm("")
        // clear the file if he was in upDateProduct
        setSelectedFile("");

        console.log("button add Product")

        //set isAdd to true because we in add 
        setIsAdd(true)
        
        // show the model
        setShowModal(true)

    }

    function handleCloseModal() {
        // reset the user choice of  category 

        setSelectedCategory("")
        setShowModal(false)
    }

    return (
        // need to be a add product button
<div className="mt-4 mr-4 flex justify-end">
             <div > {message && <Message text={message} />}</div>
            <Button btn_txt="Add new product" lbl_type="button" click_function={handleAddProduct} />
            <Model close_function={handleCloseModal}>
                {/* Add new product button inside the Model */}
                <Form />
            </Model>
            

        </div>

    )
}
