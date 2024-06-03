import React from "react";

function ButtonsFilter({ filterStatus, setFilterStatus }) {
  return (
    <div className="w-[80%] mx-auto mb-5 flex gap-2 m-5">
      <button
        onClick={() => setFilterStatus(null)}
        className={`${
          filterStatus === null ? "bg-blue-600" : "bg-blue-300"
        } font-semibold text-white py-2 px-4 border hover:border-transparent rounded`}
      >
        All
      </button>
      <button
        onClick={() => setFilterStatus(1)}
        className={`${
          filterStatus === 1 ? "bg-yellow-600" : "bg-yellow-300"
        } text-white font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded`}
      >
        New
      </button>
      <button
        onClick={() => setFilterStatus(2)}
        className={`${
          filterStatus === 2 ? "bg-purple-600" : "bg-purple-300"
        } text-white font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded`}
      >
        Process
      </button>
      <button
        onClick={() => setFilterStatus(3)}
        className={`${
          filterStatus === 3 ? "bg-green-600" : "bg-green-300"
        } text-white font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded`}
      >
        Done
      </button>
      <button
        onClick={() => setFilterStatus(4)}
        className={`${
          filterStatus === 4 ? "bg-black-600" : "bg-black-300"
        } text-black font-semibold hover:text-black py-2 px-4 border hover:border-transparent rounded`}
      >
        Canceled
      </button>
    </div>
  );
}

export default ButtonsFilter;
