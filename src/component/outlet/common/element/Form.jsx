import React, { useContext } from "react";
import LabelAndInput from "./LabelAndInput";
import OpenFile from "./OpenFile";
import TextArea from "./TextArea";
import CategoryInput from "./SelctionInpout";
import Button from "./Button";
import {productContext} from "../../../../helper/ProductContext"

// set the option for category
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

const {selectedCategory} = useContext(productContext)
  function handleSubmit(e) {
    e.preventDefault();
    const date = new FormData(e.targe);
    date.append("product_category",selectedCategory)
    console.log(date)
    e.target.reset()

    for (const [key, value] of date.entries()) {
        console.log(`${key}: ${value}`);
      }
    console.log(date)
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row space-x-4">
          <div className="flex flex-col md:w-3/8">
            <LabelAndInput
              name="product_name"
              lbl_txt={"Product Name"}
              type={"text"}
            />
            <TextArea
              name={"product_description"}
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
