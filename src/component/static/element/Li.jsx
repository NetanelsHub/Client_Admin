import React from "react";
import { Link } from "react-router-dom";

export default function Li({ navName }) {
  function saveLocation(){
    const {pathname} = location;
    localStorage.setItem("loc",pathname);
  }

  return (
    <li
      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
      aria-current="page"
      onClick={saveLocation}
    >
      <Link to={`/${navName !== "Dashboard" ? navName : ""}`}>{navName}</Link>
    </li>
  );
}
