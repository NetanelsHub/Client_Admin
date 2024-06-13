import React, { useContext, useEffect, useState, useTransition } from "react";
import { productContext } from "../../../../helper/ProductContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Pagination from "./Pagination";
import ConfirmModal from '../element/ConfirmModal';

import SearchComponent from "./SearchComponent";
import Model from "./Model";

const url = "http://localhost:3000/products";

export default function TableProduct() {
  const { dataProduct, deleteProduct, setProductForm, setShowModal, setSelectedFile, setIsAdd, crudProduct, setDataProduct } = useContext(productContext);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [timeoutId, setTimeoutId] = useState(null); // משתנה לאחסון ה־timeoutId
// בשביל התיאור
  const [expandedRows, setExpandedRows] = useState(false);
// בשביל התמונה
  const [selectedProductId, setSelectedProductId] = useState(null);
// בשביל המודל מחיקה
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);



  async function getAllProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/getAllProducts`, {
        params: { page, limit: 5, search: searchTerm, price: priceFilter },
        withCredentials: true,
      });
      setDataProduct(data.products);
      setPages(data.pages);
      setLoading(false);
      if (!data) throw new Error("There are no Products");
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId); // ביטול ה־timeout הקודם
    }
    const newTimeoutId = setTimeout(() => {
      getAllProduct();
    }, 500);

    setTimeoutId(newTimeoutId); // שמירת ה־timeoutId החדש
  }, [searchTerm, priceFilter,crudProduct]);

  function handleDelete(id) {
    setSelectedProductId(id);
    setIsProductModalOpen(true);
  }

  function confirmDelete() {
    deleteProduct(selectedProductId);
    setIsProductModalOpen(false);
  }

  useEffect(() => {
    getAllProduct();
  }, [crudProduct, page, searchTerm, priceFilter]);

  function handleUpdate(product) {
    setIsAdd(false);
    setShowModal(true);
    setProductForm(product);
    setSelectedFile("");
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function toggleRowExpansion(id) {
    setExpandedRows(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

  function openModal(productId){
    const product = dataProduct.find(p => p._id === productId);
    console.log(product)
    if (product) {
      setSelectedProductId(product);
      setShowModal(true)
    }
    
  }

  function handleCloseModal() {
    // reset the user choice of  category 

    setShowModal(false)
    setSelectedProductId(null);
}

  return (
    <div>
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
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
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                rtp
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
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              dataProduct.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" : "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"}>
                  <td className="px-6 py-4">{product.product_name}</td>
                  <td className="px-6 py-4">
                    <div className={`overflow-hidden ${expandedRows[product._id] ? "" : "line-clamp-2"}`}>
                      {product.product_description}
                    </div>
                    <button
                      onClick={() => toggleRowExpansion(product._id)}
                      className="text-blue-500 mt-2 focus:outline-none"
                    >
                      {expandedRows[product._id] ? "Show Less" : "Show More"}
                    </button>
                  </td>
                  <td className="px-6 py-4">{product.product_amount}</td>
                  <td className="px-6 py-4">{product.product_price_before_discount}</td>
                  <td className="px-6 py-4">{product.product_discount}</td>
                  <td className="px-6 py-4">{product.product_price}</td>
                  <td className="px-6 py-4">
                    {product.product_category.map((category) => category.category_name)}
                  </td>
                  <td className="px-6 py-4">
                    <img className="w-[60px] h-[60px] object-cover cursor-pointer"  src={product.product_image} alt={product.product_name} 
                    onClick={() => openModal(product._id)} />
                  {selectedProductId &&   (<Model productId={selectedProductId} close_function={handleCloseModal}>
                    <img  className="max-w-full max-h-[80vh]"src={selectedProductId.product_image} alt={selectedProductId.product_name} />

                    </Model>)}
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
              ))
            )}
          </tbody>
        </table>
        {!loading && <Pagination page={page} setPage={setPage} pages={pages} onPageChange={handlePageChange} />}
        <ConfirmModal 
        isOpen={isProductModalOpen} 
        message="Are you sure you want to delete this product?" 
        onConfirm={confirmDelete} 
        onCancel={() => setIsProductModalOpen(false)} 
      />
      </div>
    </div>
  );
}
