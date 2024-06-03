import React, { useContext } from 'react';
import {productContext} from '../../../../helper/ProductContext';


// in the addProduct i don't send any function and i get error
// to avoid it i send default  empty function : onChange = () => {} }

export default function LabelAndInput({ name, lbl_txt,type,value ,onChange = () => {} }) {
  const {isAdd} = useContext(productContext)
//   const handleChange = (e) => {
//     const value = e.target.value;
//     console.log(value); // You can log the value here if needed
// }
// function handleChange(e){
//   console.log(e.target.value)
// } 
// const {productFrom} = useContext(productContext)


  return (
    
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {lbl_txt} 
      </label>
      <input
        
        id={name}
        type={type} 
        name={name}

        {...(!isAdd && { value })}
        onChange={(e) => onChange(name, e.target.value) }
        
       
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        required
      />
    </div>
  );
}
