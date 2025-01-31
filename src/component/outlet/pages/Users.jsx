import React, { useContext, useEffect, useState, useTransition } from "react";
import { globalContext } from "../../../helper/GlobalContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AddUser from "../common/form/AddUser";
import { clientContext } from "../../../helper/ClientContext";
import Message from "../../static/element/Message";
import axios from "axios";
import Pagination from "../common/element/Pagination";
import ConfirmModal from '../common/element/ConfirmModal';



const url = "http://localhost:3000/client";

export default function Users() {
  const { showModal, setShowModal, message } = useContext(globalContext);
  const { deleteClient, setOnAddClient, setClientInfo, setAllClients, crudClients, allClients } = useContext(clientContext);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
// בשביל המודל מחיקה
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [isPending, startTransition] = useTransition(); // הוספת useTransition

  async function getClients() {
    try {
      startTransition(() => {
        setLoading(true);
      });

      const { data } = await axios.get(`${url}/getClients`, {
        params: { page, limit: 7, searchEmail },
        withCredentials: true,
      });

      if (!data) throw new Error("There are no clients");

      setAllClients(data.allClients);
      setPages(data.pages);

      // עם הסיום של הבקשה, נסתיר את ההודעה ונעדכן את הסטאטוס של הטעינה
      startTransition(() => {
        setLoading(false);
      });
    } catch (error) {
      // במקרה של שגיאה, נעדכן רק את הסטאטוס של הטעינה
      startTransition(() => {
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getClients(); // קריאה ל־getClients עם timeout
    }, 500); // זמן המתנה לאחר סיום ההקלדה, במילי-שניות

    return () => clearTimeout(timeoutId); // בכדי לא לעשות קריאות רבות מדי, ננקה את ה־timeout בכל שינוי ב־searchEmail
  }, [searchEmail,crudClients,page]);

  function handleAddUser() {
    setOnAddClient(true);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }



  function handleDelete(client_id) {
    setSelectedUserId(client_id);
    setIsUserModalOpen(true);
  }

  function confirmDelete() {
    deleteClient(selectedUserId);
    setIsUserModalOpen(false);
  }

  function handleUpdate(client) {
    setOnAddClient(false);
    const { client_fName, client_lName, client_email, client_password, _id } = client;
    setClientInfo({ client_fName, client_lName, client_email, client_password, _id });
    setShowModal(true);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };
  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="flex justify-end mt-6 ">
          <button
            type="button"
            onClick={handleAddUser}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new User
          </button>
          <div>{message && <Message text={message} />}</div>
        </div>
      
        <div className="mb-4 ">
      <input
        type="text"
        className="px-3 py-2 w-48 mr-4 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Search by email..."
        value={searchEmail}
        onChange={handleSearchChange}
      />
      </div>
      
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
              <AddUser />
            </div>
          </div>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
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
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                allClients.map((client, index) => (
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
                      <button onClick={() => handleUpdate(client)}>
                        <FaEdit className="text-blue-500" size={25} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            {!loading && <Pagination page={page} setPage={setPage} pages={pages} onPageChange={handlePageChange} />}
            <ConfirmModal 
        isOpen={isUserModalOpen} 
        message="Are you sure you want to delete this user?" 
        onConfirm={confirmDelete} 
        onCancel={() => setIsUserModalOpen(false)} 
      />
          </div>
        </div>
      </div>
    </>
  );
}
