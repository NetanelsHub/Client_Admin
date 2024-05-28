import {useState,useEffect} from 'react'
import { IoArrowUpSharp  , IoArrowDownSharp } from "react-icons/io5";
import ButtonsFilter from "../Orders/ButtonsFilter";

function OrderTable({orders}) {
  const [filterStatus, setFilterStatus] = useState(null);
  const [dataOrders, setDataOrders] = useState([...orders]);

  useEffect(() => {
    setDataOrders([...orders]);
  }, [orders]);

  return (
    <div>      
    <ButtonsFilter
    setFilterStatus={setFilterStatus}
    filterStatus={filterStatus}
  />
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order num
            </th>
            <th scope="col" className="px-6 py-3">
            Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
            Customer Phone
            </th>
            <th scope="col" className="px-6 py-3">
            Customer Address
            </th>
            <th scope="col" className="px-6 py-3">
            Total
            </th>
            <th scope="col" className="px-6 py-3">
            Status
            </th>
          </tr>
        </thead>
        {/* <tbody>
              <tr
                // className={
                //   index % 2 === 0
                //     ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                //     : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                // }
              >
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"> </td>
              </tr>
          </tbody> */}
                   <tbody>
            {dataOrders
              .filter((order) =>
                !filterStatus ? order : order.status === filterStatus
              )
              .map((order, i) => (
                <tr
                  key={order._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {i}
                    {order._id.slice(0, 4)}
                  </td>
                  <td className="">
                    {new Date(order.createdAt).toLocaleString("en-il", {
                      weekday: "short",
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">{order.clientId.client_fName}</td>
                  <td className="px-6 py-4">
                    {order.client_details.customer_phone}
                  </td>
                  {/* <td className="px-6 py-4">
                    {order.customer_details.customer_address.city}{" "}
                    {order.customer_details.customer_address.street}{" "}
                    {order.customer_details.customer_address.building}
                  </td> */}
                  <td className="px-6 py-4">{order.total_price}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`
                   ${
                     order.status === 1
                       ? "bg-yellow-500"
                       : order.status === 2
                       ? "bg-purple-500"
                       : order.status === 3
                       ? "bg-green-700"
                       : "bg-black"
                   }
                   border
                     border-gray-300 text-white
                     text-sm rounded-lg focus:ring-blue-500
                      focus:border-blue-500 block w-full p-2.5`}
                    >
                      <option value="1">New</option>
                      <option value="2">Process</option>
                      <option value="3">Done</option>
                      <option value="4">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
      </table>
    </div>
  
  </div>
  )
}

export default OrderTable