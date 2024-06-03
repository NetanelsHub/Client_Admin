import {useState,useEffect, useContext} from 'react'
import { IoArrowUpSharp  , IoArrowDownSharp } from "react-icons/io5";
import { PiListMagnifyingGlassThin } from "react-icons/pi";

import ButtonsFilter from "../Orders/ButtonsFilter";
import { productContext } from "../../../../helper/ProductContext"
import Model from '../element/Model';
import Form from '../element/Form';
import FullOrder from './FullOrder';

function OrderTable({orders, updateStatus}) {

  const{setShowModal,setOrder}=useContext(productContext)
  const [filterStatus, setFilterStatus] = useState(null);
  const [dataOrders, setDataOrders] = useState([...orders]);
  const [searchOrder, setSearchOrder] = useState("");


const [sortIndex,setSortIndex] = useState(null);
const [sort,setSort] = useState('DESC');

function handleSort(col,nestedCol){
  if(sort === "DESC"){
  dataOrders.sort((a,b) => {
   if(nestedCol) return a[nestedCol][col] > b[nestedCol][col] ? -1 : 1;
   else return a[col] > b[col] ? -1 : 1;
   })
   setSort("ASC")
 }
  else {
  dataOrders.sort((a,b) => {
     if(nestedCol) return a[nestedCol][col] > b[nestedCol][col] ? 1 : -1;
     else return a[col] > b[col] ? 1 : -1;
     })
   setSort("DESC")
 }
 }  
 
 useEffect(() => {
  setDataOrders(
    orders.filter(
      (order) =>
        order.clientId.client_fName.includes(searchOrder) ||
        order.client_details.client_phone.startsWith(searchOrder) ||
        order._id.startsWith(searchOrder)
    )
  );
}, [searchOrder]);

  useEffect(() => {
    setDataOrders([...orders]);
  }, [orders]);


  function showFullOrder(order){
    setOrder(order) 
    console.log(order)
    setShowModal(true)
    
  }

  function handleCloseModal() {

    setShowModal(false)
}


  return (
    
    <div>
    <Model close_function={handleCloseModal}> 
    <FullOrder/>             
     </Model>   

    <ButtonsFilter
    setFilterStatus={setFilterStatus}
    filterStatus={filterStatus}
  />

<div className="w-[80%] mx-auto">
        <input
          onChange={(e) => setSearchOrder(e.target.value)}
          type="text"
          id="first_name"
          className="bg-gray-50 border my-5 w-[20%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="search Order"
          required
        />
    </div>
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order num
            </th>
            <th onClick={() => {
                setSortIndex(1);
                handleSort("createdAt")
              }} scope="col" className="px-6 cursor-pointer flex w-full h-full items-center justify-center py-3">
                {sortIndex === 1 && sort === "DESC" && <IoArrowUpSharp size={15} className="text-center" />}
                {sortIndex === 1 && sort === "ASC" && <IoArrowDownSharp size={15} className="text-center" />}
                Order Date
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
            <th onClick={() => {
                setSortIndex(5);
                handleSort("total_price")
              }} scope="col" className="px-6 cursor-pointer flex w-full h-full items-center justify-center py-3">
                {sortIndex === 5 && sort === "DESC" && <IoArrowDownSharp size={15} className="text-center" />}
                {sortIndex === 5 && sort === "ASC" && <IoArrowUpSharp size={15} className="text-center" />}
                Total
              </th>
            <th scope="col" className="px-6 py-3">
            Status
            </th>
          </tr>
        </thead>
                   <tbody>
            {dataOrders
              .filter((order) =>
                !filterStatus ? order : order.status === filterStatus
              )
              .map((order, i) => (
                <tr
               
                  key={order._id}
                  className="cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                 <td className="px-6 py-4 flex items-center space-x-2">
                  <PiListMagnifyingGlassThin  size={25}  onClick={() => showFullOrder(order)} />
                   <span>{order._id.slice(0, 4)}</span>
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
                    {order.client_details.client_phone}
                  </td>
                  {/* <td className="px-6 py-4">
                    {order.customer_details.customer_address.city}{" "}
                    {order.customer_details.customer_address.street}{" "}
                    {order.customer_details.customer_address.building}
                  </td> */}
                  <td className="px-6 py-4"></td>
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
                     text-sm rounded-lg 
                      block w-full p-2.5`}
                    >
                      <option value="1" className="bg-yellow-500">New</option>
                      <option value="2" className="bg-purple-500">Process</option>
                      <option value="3" className="bg-green-700">Done</option>
                      <option value="4" className="bg-black">Canceled</option>
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