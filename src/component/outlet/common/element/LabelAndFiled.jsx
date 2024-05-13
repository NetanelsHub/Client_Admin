import React from "react";
import {Formik, Field, ErrorMessage } from "formik";

export default function LabelAndFiled({name, lbl_txt,}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {[lbl_txt]}

      </label>
      <Field
        type={name}
        id={name}
        name={`admin_${name}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        required
      />
      <ErrorMessage
          className="text-red-600 text-sm"
          name={`admin_${name}`}
          component="div"
        />
    </div>
  );
}
