import React from "react";

function Pagination({page, setPage, pages}) {
  const pageNumbers = [];
  console.log(pageNumbers)
  for (let i = 1; i < Math.ceil(pages+1); i++)
    pageNumbers.push(i);

  return (
    <div className="flex justify-center items-center w-[50%] mx-auto position:relative bottom-0 z-50">
      <ul className="flex gap-5">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                page === number
                  ? "bg-blue-500"
                  : "bg-transparent border border-white"
              } p-2.5 rounded`}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
