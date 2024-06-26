import React from "react";

function PaginationClient({
  productPerPage,
  currentPage,
  setCurrentPage,
  totalProduct,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++)
    pageNumbers.push(i);

  return (
    <div className="flex justify-center items-center w-[50%] mx-auto">
      <ul className="flex gap-5">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number
                  ? "bg-blue-500"
                  : "bg-transparent border border-white"
              } p-2.5 rounded`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaginationClient;
