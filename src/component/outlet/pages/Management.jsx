import React, { useContext, useState } from "react";
import AddAdmin from "../common/form/AddAdmin" 
import { globalContext } from "../../../helper/GlobalContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function Management() {
  const {showModal,setShowModal ,userData} = useContext(globalContext)

  console.log(userData)

  function handleAddAdmin() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    
   <div>
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
            {/* onClose={handleCloseModal}  */}
            <AddAdmin />
          </div>
        </div>
      )}
      <div className="flex justify-end">
      <button
        type="button"
        onClick={handleAddAdmin}
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add new Admin or manger
      </button></div>
     
    </div>


{/* <table className="table-auto  w-3/5 mx-auto ">
<thead>
  <tr>
    <th className="px-4 py-2">Name</th>
    <th className="px-4 py-2">Last Name</th>
    <th className="px-4 py-2">Email</th>
    <th className="px-4 py-2">Role</th>
    <th className="px-4 py-2">Action</th>
  </tr>
</thead>
<tbody>

  {userData.map((item, index) => (
    <tr key={index}>
      <td className="border px-4 py-2">{item.admin_fName}</td>
      <td className="border px-4 py-2">{item.admin_lName}</td>
      <td className="border px-4 py-2">{item.admin_email}</td>
      <td className="border px-4 py-2">{item.admin_role}</td>
      <td className="border px-4 py-2">       
                    <button>
                     <MdDelete className="text-red-600" size={25} />
                     </button>
                     <button>
                  <FaEdit className="text-blue-500" size={25} />
                  </button>
</td>
    </tr>
  ))}
</tbody>
</table> */}
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {userData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.admin_fName}
                    </th>
                    <td className="px-6 py-4">
                        {item.admin_lName}
                    </td>
                    <td className="px-6 py-4">
                        {item.admin_email}
                    </td>
                    <td className="px-6 py-4">
                        {item.admin_role}
                    </td>
                    <td className="px-6 py-4">
                        <button>
                            <MdDelete className="text-red-600" size={25} />
                        </button>
                        <button>
                            <FaEdit className="text-blue-500" size={25} />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

</div>

);
}
