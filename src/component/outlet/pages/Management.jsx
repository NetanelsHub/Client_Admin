import React, { useState } from "react";
import AddAdmin from "../common/form/AddAdmin" 
import { globalContext } from "../../../helper/GlobalContext";


export default function Management() {
  const [showModal,setShowModal] = useState(globalContext)
  
  function handleAddAdmin() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    
   
    <div className="overflow-x-auto  ">

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            <AddAdmin onClose={handleCloseModal} />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleAddAdmin}
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add new Admin or manger
      </button>
      <table className="table-auto  w-3/5 mx-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.lastName}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.action}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
