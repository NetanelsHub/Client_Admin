import React, { useContext } from 'react'
import { globalContext } from '../../../helper/GlobalContext'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AddUser from '../common/form/AddUser';
import { clientContext } from '../../../helper/ClientContext';
import Message from "../../static/element/Message"

export default function Users() {
  const { showModal, setShowModal , message } = useContext(globalContext)
  const { allClients ,deleteClient} = useContext(clientContext)

  function handleAddUser() {
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleDelete(client_id){
    deleteClient(client_id)

  }
  return (
    // need to add the table 

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
              <AddUser />
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddUser}
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new Users
          </button>
          {/* {console.log(message)} */}
          <div> {message && <Message text={message} />}</div>

        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {allClients.map((client, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                }
              >
                <td className="px-6 py-4">{client.client_fName}</td>
                <td className="px-6 py-4">{client.client_lName}</td>
                <td className="px-6 py-4">{client.client_email}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(client._id)}>
                      <MdDelete className="text-red-600" size={25} />
                    </button>
                    {/* <button onClick={() => handleUpdate(superUser)}>
                      <FaEdit className="text-blue-500" size={25} />
                    </button>  */}
                </td>
              </tr>
            ))}
          </tbody>


        </table>
      </div>
    </div>
  )
}
