import { Formik, Field, ErrorMessage } from "formik";
import { globalContext } from "../../../../helper/GlobalContext";
import { useContext } from "react";

export default function SelectRoll({ name }) {
  const { optionSelection, updateUser } = useContext(globalContext);
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

        {/* if optionSelection is true, show only "Admin" and "Editor Manager" as options */}
        {optionSelection ? (
          <>
            {/* if the role is admin, show admin as the 1st option, else show Editor Manager as 1st option */}
            {updateUser.admin_role === "Admin" ? (
              <>
                <option value="Admin">Admin</option>
                <option value="Editor Manager">Editor Manager</option>
              </>
            ) : (
              <>
              {console.log("role:",updateUser.admin_roll)}
                <option value="Editor Manager">Editor Manager</option>
                <option value="Admin">Admin</option>
              </>
            )}
          </>
        ) : (
          <>
            <option value="Select Role">Select Role</option>
            <option value="Editor Manager">Editor Manager</option>
            <option value="Admin">Admin</option>
          </>
        )}
      </Field>
      <ErrorMessage
        className="text-red-600 text-sm"
        name={`admin_${name}`}
        component="div"
      />
    </div>
  );
}
