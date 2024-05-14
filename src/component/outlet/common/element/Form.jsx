import React, { useContext } from "react";
import LabelAndInput from "./LabelAndInput";
import OpenFile from "./OpenFile";
import TextArea from "./TextArea";
import CategoryInput from "./SelctionInpout";
import Button from "./Button";
import {productContext} from "../../../../helper/ProductContext"
import {globalContext} from  "../../../../helper/GlobalContext"

// set the option of category to selectionInput
const options = [
  { value: "body care", label: "body care" },
  { value: "hair line", label: "hair line" },
  { value: "gold performance", label: "gold performance" },
  { value: "kits", label: "kits" },
  { value: "makeup", label: "makeup" },
  { value: "nail kit", label: "nail kit" },
  { value: "premium", label: "premium" },
];

export default function Form() {
const {selectedCategory,setSelectedCategory,selectedFile,setShowModal,setSelectedFile} = useContext(productContext)
const {setMessage} = useContext(globalContext)

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedFile)
    const date = new FormData(e.target);
    date.append("product_category",selectedCategory)
    date.append("product_image",selectedFile)

    // here need to add function axios

   // check what is in the FromDate
    // for (const [key, value] of date.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
   

    // reset the category user choice
    setSelectedCategory("")
    // reset back the file input
    setSelectedFile("")
    // reset all info inside teh form 
    e.target.reset()
    //clos the form
    setShowModal(false)
    //send message from the server
    setMessage("add product")

  }

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row space-x-4">
          <div className="flex flex-col md:w-3/8">
            <LabelAndInput
              name="product_name"
              lbl_txt={"Product Name"}
              type={"text"}
            />
            <TextArea
              name="product_description"
              lbl_txt={"Product Description"}
              placeholder={"Write a brief description of the product..."}
            />
            <CategoryInput options={options} lbl_txt={"Product Category"} />
            <OpenFile lbl_txt={"Product Image"} />
          </div>
          <div className="flex flex-col md:w-5/8">
            <LabelAndInput
              name="product_price"
              lbl_txt={"Product Price"}
              type={"number"}
            />
            <LabelAndInput
              name="product_amount"
              lbl_txt={"Product Amount"}
              type={"number"}
            />
            <LabelAndInput
              name="product_discount"
              lbl_txt={"Product Discount"}
              type={"number"}
            />
            <div className="flex justify-center items-center flex-grow">
              <Button btn_txt={"Submit"} btn_type={"submit"} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
