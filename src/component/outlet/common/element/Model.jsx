import {useContext,useState} from 'react';
import { productContext } from '../../../../helper/ProductContext';


export default function Model({close_function,children}) {
    const {showModal} = useContext(productContext)

   
   
  return (
    <div className="overflow-x-auto">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={close_function}></div>
          <div className="relative bg-white p-6 rounded-lg">

            <div className="flex justify-end p-2">
          <button onClick={close_function} className="text-black text-2xl hover:text-red-500">
            &times;
          </button>
        </div>
            {/* Modal content goes here */}
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

