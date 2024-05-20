import React, { useContext } from "react";
import { productContext } from "../../../../helper/ProductContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableProduct() {
  const { dataProduct, deleteProduct, setProductForm,setShowModal,productFrom, setSelectedFile, isAdd , 
    setIsAdd } = useContext(productContext);

  function handleDelete(id) {
    deleteProduct(id)
  }

  function handleUpdate(product) {
    console.log("on update")
    // set to false isAdd  because we in update
    setIsAdd(false)
    // to clean the input image 
    // setSelectedFile("")
    // open the model
    setShowModal(true)
    // set the  product from the table 
    setProductForm(product)
    // if user click on add product 1st and choice a file 
    //  need to reset it so its not show on update 
    setSelectedFile("")

    // console.log(productFrom)

  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
            Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Discount
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {dataProduct && (
          <tbody>
            {dataProduct.map((product, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                }
              >
                <td className="px-6 py-4">{product.product_name}</td>
                <td className="px-6 py-4">{product.product_description}</td>
                <td className="px-6 py-4">{product.product_price}</td>
                <td className="px-6 py-4">{product.product_amount}</td>
                <td className="px-6 py-4">{product.product_discount}</td>
                <td className="px-6 py-4">
                  {product.product_category.map(
                    (category) => category.category_name
                  )}
                </td>
                <td className="px-6 py-4">
                  <img
                    width={60}
                    height={60}
                    src={product.product_image}
                    alt={product.product_name}
                  />
                  {/* .replace(/^"|"$/g, '') */}
                </td>

                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(product._id)}>
                    <MdDelete className="text-red-600" size={25} />
                  </button>
                  <button onClick={() => handleUpdate(product)}>
                    <FaEdit className="text-blue-500" size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
