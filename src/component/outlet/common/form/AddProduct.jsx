// form of add product --> Product

import React, { useContext } from 'react';
import Button from '../element/Button';
import Model from '../element/Model';
import Form from '../element/Form';
import { productContext } from '../../../../helper/ProductContext';

export default function AddProduct() {
    const { setShowModal } = useContext(productContext)
    
    function handleAddProduct() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        // need to be a add product button
        <>
            <Button btn_txt="Add new product" click_function={handleAddProduct} />
            <Model close_function={handleCloseModal}>
                {/* Add new product button inside the Model */}
                <Form />
            </Model>
        </>

    )
}
