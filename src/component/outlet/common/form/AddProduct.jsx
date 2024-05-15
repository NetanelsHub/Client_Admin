// form of add product --> Product

import React, { useContext } from 'react';
import Button from '../element/Button';
import Model from '../element/Model';
import Form from '../element/Form';
import { productContext } from '../../../../helper/ProductContext';
import Message from "../../../static/element/Message";
import {globalContext} from "../../../../helper/GlobalContext"

export default function AddProduct() {
    const { setShowModal ,setSelectedCategory} = useContext(productContext)
    const {message,} = useContext(globalContext)

    function handleAddProduct() {
        setShowModal(true)
    }

    function handleCloseModal() {
        // reset the user choice of  category 
        setSelectedCategory("")
        setShowModal(false)
    }

    return (
        // need to be a add product button
        <>
             <div> {message && <Message text={message} />}</div>
            <Button btn_txt="Add new product" lbl_type="button" click_function={handleAddProduct} />
            <Model close_function={handleCloseModal}>
                {/* Add new product button inside the Model */}
                <Form />
            </Model>
            

        </>

    )
}
