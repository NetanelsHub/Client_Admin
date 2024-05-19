import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../../../helper/ProductContext";

export default function CategoryInput({ options, lbl_txt }) {

  const { selectedCategory, setSelectedCategory,productFrom , isAdd,setProductForm} = useContext(productContext);

  function handleCategoryChange(e) {
    // for add product
    const selection = e.target.value
    setSelectedCategory(e.target.value)
    // console.log(selectedCategory)
   
    {
      !isAdd && setProductForm(prevState => ({
        ...prevState,
        product_category: selection,
      }));
    }

  }

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        {lbl_txt}
      </label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
       {isAdd ? <option value="1">Select a category</option> :
        <option value="1">{productFrom.product_category[0].category_name}</option> }

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* <p>{selectedCategory}</p> */}
    </div>
  );
}

// how to send the option
// const options = [
//     { value: '1', label: 'Category 1' },
//     { value: '2', label: 'Category 2' },
//     // Add more options as needed
//   ];
