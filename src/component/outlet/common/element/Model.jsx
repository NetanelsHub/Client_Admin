import {useContext,useState} from 'react';
import { productContext } from '../../../../helper/ProductContext';


export default function Model({close_function,children}) {
    const {showModal} = useContext(productContext)

   
   
  return (
    <div className="overflow-x-auto">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg">
            <button
             onClick={close_function}
              className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            {/* Modal content goes here */}
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

