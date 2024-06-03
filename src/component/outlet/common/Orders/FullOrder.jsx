import React, { useContext } from 'react';
import { productContext } from "../../../../helper/ProductContext"

const FullOrder = () => {
    const{order}=useContext(productContext)
  return (

      <div className="bg-white rounded-lg w-1/2 p-5 relative">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Client Details</h3>
          <p>Phone: {order.client_details.client_phone}</p>
          {/* <p>Address: {order.client_details.client_address.city}, {order.client_details.client_address.street}, {order.client_details.client_address.building}</p> */}
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Products</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                <p>Product ID: {product.productId}</p>
                <p>RTP: ${product.RTP}</p>
                <p>Quantity: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Total Price</h3>
          <p>${order.total_price}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Status</h3>
          <p>{order.status}</p>
        </div>
    </div>
  );
};

export default FullOrder;
