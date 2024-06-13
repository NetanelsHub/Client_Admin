import React, { useContext, useState , useEffect} from "react";
import AddAdmin from "../common/form/AddAdmin";
import { globalContext } from "../../../helper/GlobalContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Message from "../../static/element/Message"
import ConfirmModal from "../common/element/ConfirmModal";
const url = "http://localhost:3000/user"

export default function Management() {
  const { showModal, setShowModal, userData, deleteSuperUser, message,setOptionSelection,setUpdateUser, setAddSubmit ,sendReq ,setUserData} = useContext(globalContext)

  // בשביל המודל מחיקה
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);



  async function getSuperUser() {
    try {
      // console.log("hi");
      const { data } = await axios.get(`${url}/getSuperUser`, {
        withCredentials: true,
      });
      setUserData(data.allUser);
      console.log(data);
      if (!data) throw new Error("There is not Admin/Manager");
    } catch (error) {}
  }

  useEffect(() => {
    getSuperUser();
  }, [sendReq]);


  function handleAddAdmin() {
    console.log("in handleAddAdmin")
    setShowModal(true);
     //set OptionSelection to true
     setOptionSelection(false)
     
  }
 
  function handleCloseModal() {
    setShowModal(false);

    //set the Selection option
    setOptionSelection(false)

    // reset all the value inside the form
    setUpdateUser("")

  }


  function handleDelete(id) {
    setSelectedAdminId(id);
    setIsAdminModalOpen(true);
  }

  function confirmDelete() {
    deleteSuperUser(selectedAdminId);
    setIsAdminModalOpen(false);
  }


  function handleUpdate(superUser){
    console.log(superUser)
     // insert only this to super user to the form
     const { admin_fName, admin_lName, admin_role, admin_email,_id,admin_password} = superUser
    //  console.log(admin_fName, admin_lName, admin_role, admin_email)
  
     //open the model
     setShowModal(true);
 
     //set all info for the form 
     setUpdateUser({ admin_fName, admin_lName, admin_role, admin_email,_id,admin_password })
 
     //set OptionSelection to true
     setOptionSelection(true)

     // set AddSubmit so the submit button will do the update
     setAddSubmit(false)

    

     
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
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {userData && (
            <tbody>
              {userData.map((superUser, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  }
                >
                 
                  <td className="px-6 py-4">{superUser.admin_fName}</td>
                  <td className="px-6 py-4">{superUser.admin_lName}</td>
                  <td className="px-6 py-4">{superUser.admin_email}</td>
                  <td className="px-6 py-4">{superUser.admin_role}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(superUser._id)}>
                      <MdDelete className="text-red-600" size={25} />
                    </button>
                    <button onClick={() => handleUpdate(superUser)}>
                      <FaEdit className="text-blue-500" size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <ConfirmModal 
        isOpen={isAdminModalOpen} 
        message="Are you sure you want to delete this admin?" 
        onConfirm={confirmDelete} 
        onCancel={() => setIsAdminModalOpen(false)} 
      />
      </div>
    </div>
  );
}
