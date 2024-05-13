import React, { useState } from 'react';

export default function LoadImage({ lbl_txt }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file=(event.target.files[0]);
    setSelectedFile(file);
  };

  return (
    <div className="mb-5">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {lbl_txt}
      </label>
      <div className="flex items-center">
        <label
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
        >
          Choose Image
          <input
            type="file"
            className="hidden" // hide the file input visually
            onChange={handleFileChange}
          />
        </label>
        <input
          type="text"
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ml-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="No file chosen"
          value={selectedFile ? selectedFile.name : ''}
          readOnly // the input read-only so users can't edit the file path manually
        />
      </div>
    </div>
  );
}
