import {useContext} from "react";
import { productContext} from "../../../../helper/ProductContext"

export default function TextArea({ lbl_txt, placeholder ,name}) {
    const{setText} = useContext(productContext)

    const handleChange = (event) => {
        setText(event.target.value);
        // dont forget to setText("") on submit
      };

    return (
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          {lbl_txt}
        </label>
        <textarea
          rows="1" // Set maximum rows to 3
          onChange={handleChange}
          name={name}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full resize-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    );
  }