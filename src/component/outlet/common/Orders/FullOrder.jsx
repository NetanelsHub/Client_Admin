import React, { useContext ,useEffect} from 'react';
import { productContext } from "../../../../helper/ProductContext"
import Model from '../element/Model';
import { FaSpinner } from "react-icons/fa";

const FullOrder = ({updateStatus}) => {
  const { order,setOrder, setShowModal } = useContext(productContext);

  useEffect(() => {
    if (!order) {
      const savedOrder = localStorage.getItem('order');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }
  }, [order, setOrder]);

  function handleCloseModal() {
    setShowModal(false);
  }

   if (!order) {
    return <div className="flex justify-center items-center ">
    <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
  </div>;
  }

  return (
    <Model close_function={handleCloseModal}>  
      <div className="bg-white rounded-lg w-full p-5 relative">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Order Number: {order._id}</h3>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Client Details</h3>
          <p>Name: {order.clientId?.client_fName} {order.clientId?.client_lName}</p>
          <p>Email: {order.clientId?.client_email}</p>
          <p>Address: {order.client_details.client_address?.street} {order.client_details.client_address?.building}, Apartment {order.client_details.client_address?.apartment}, {order.client_details.client_address?.city}</p>
          <p>Phone: {order.client_details?.client_phone}</p>
        </div>

        <div className="relative overflow-x-auto mb-4">
          <h3 className="text-xl font-semibold">Products</h3>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">Product name</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.productId?.product_name}
                  </th>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">${product.RTP}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Total</th>
                <td className="px-6 py-3">{order.products.reduce((acc, product) => acc + product.quantity, 0)}</td>
                <td className="px-6 py-3">${order.total_price}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold ">Status</h3>
          <div>  <select
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
                      block  p-2.5`}
                    >
                      <option value="1" className="bg-yellow-500 text-center">New</option>
                      <option value="2" className="bg-purple-500">Process</option>
                      <option value="3" className="bg-green-700">Done</option>
                      <option value="4" className="bg-black">Canceled</option>
                    </select></div>
        </div>
      </div>
    </Model>
  );
};

export default FullOrder;
