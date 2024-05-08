import { Formik, Field, ErrorMessage } from "formik";

export default function SelectRoll({ name }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {`Your ${name}`}
      </label>
      <Field
        as="select"
        id={name}
        name={`admin_${name}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
         {/* <option value="Editor Manager">Select Roll</option> */}
        <option value="Select Role">Select Role</option>
        <option value="Editor Manager">Editor Manager</option>
        <option value="Admin">Admin</option>
      </Field>
      <ErrorMessage
        className="text-red-600 text-sm"
        name={`admin_${name}`}
        component="div"
      />
    </div>
  );
}