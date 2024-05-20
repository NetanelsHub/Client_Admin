import React, { useContext, useState } from 'react';
import { productContext } from "../../../../helper/ProductContext"

export default function LoadImage({ lbl_txt,value }) {
  const { selectedFile, setSelectedFile, productFrom, setProductForm, isAdd, setIsAdd } = useContext(productContext);

  const handleFileChange = (event) => {
    // can add only 1 file
    const file = (event.target.files[0]);
    setSelectedFile(file);

    console.log("isAdd:", isAdd)
    //if user on update 
    {
      !isAdd && setProductForm(prevState => ({
        ...prevState,
        product_image: file,
      }));
    }

  };
  // const handleChange = (e) => {
  //   const file = e.target.files[0];
  //   onChange('product_image', file);
  // };


  return (
    <div className="mb-5">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {lbl_txt}
      </label>
      <div className="flex items-center">
        <label
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
        >
          Choose Image
          <input
            type="file"
            accept='image/*' // only image and not other file 
            className="hidden" // hide the file input visually
            onChange={handleFileChange}
            name="product_image"
          />
        </label>
        <input
          type="text"
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ml-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="No file chosen"
          
          value={selectedFile ? selectedFile.name : value ? value :''}
          // value=   { !productFrom ?  selectedFile  ? selectedFile.name : '' : value }
          // value=   {  selectedFile  ? selectedFile.name : '' }
          // value=   {  isAdd  ? selectedFile.name : productFrom ? value: "" }
          // {...(value = isAdd ? selectedFile.name : { value })}
          // i want if add == true value = selectedFile.name if isAdd false i ned to pot the valoue
          // { ... value=isAdd ? selectedFile.name : value  }
          //  value =  {value}
          readOnly // the input read-only so users can't edit the file path manually
        />
      </div>
    </div>
  );
}
