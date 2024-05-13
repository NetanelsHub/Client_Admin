import React from 'react'
// to use it npm install react-hook-form
// import { useForm } from 'react-hook-form';
import LabelAndInput from './LabelAndInput'
import OpenFile from "./OpenFile"
import TextArea from './TextArea'
import CategoryInput from './SelctionInpout'
import Button from './Button'

// set the option for category
const options = [
    { value: '1', label: 'body care' },
    { value: '2', label: 'hair line' },
    { value: '3', label: 'gold performance' },
    { value: '4', label: 'kits' },
    { value: '5', label: 'makeup' },
    { value: '6', label: 'nail kit' },
    { value: '7', label: 'premium' },

];


export default function Form() {
    //we using useFrom hock from to handle form  
    // const { register, handleSubmit, errors } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data); // Access form data here
    //     // Perform further actions like sending data to backend, etc.
    // };


    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="max-w-screen-md mx-auto flex flex-col md:flex-row space-x-4">
                    <div className="flex flex-col md:w-3/8">
                        <LabelAndInput name="product_name" lbl_txt={"Product Name"} type={"text"} />
                        <TextArea name={"product_description"} lbl_txt={"Product Description"} placeholder={"Write a brief description of the product..."} />
                        <CategoryInput options={options} lbl_txt={"Product Category"} />
                        <OpenFile lbl_txt={"Product Image"} />
                    </div>
                    <div className="flex flex-col md:w-5/8">
                        <LabelAndInput name="product_price" lbl_txt={"Product Price"} type={"number"} />
                        <LabelAndInput name="product_amount" lbl_txt={"Product Amount"} type={"number"} />
                        <LabelAndInput name="product_discount" lbl_txt={"Product Discount"} type={"number"} />
                        <div className="flex justify-center items-center flex-grow">
                            <Button btn_txt={"Submit"} />
                        </div>
                    </div>
                </div>
            {/* </form> */}
        </>


    )
}
