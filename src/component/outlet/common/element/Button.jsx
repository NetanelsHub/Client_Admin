import React from 'react'

export default function Button({ btn_txt,btn_type ,click_function }) {
    return (
        // this button go to the right side , for the left justify-start
        <div className="flex justify-end"> 
            <button
                type={btn_type}
                onClick = {click_function}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {btn_txt}
            </button>
        </div>
    )
}