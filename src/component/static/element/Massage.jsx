import React, { useEffect, useState } from "react";

export default function Message({ text }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="absolute inset-x-0 top-0 mx-auto max-w-sm p-4 bg-white border border-gray-300 rounded-md shadow-md">
          <p className="text-gray-800">{text}</p>
        </div>
      )}
    </>
  );
};


// to call it
// import Message from "./Message";
// <div className="relative">
//   <Message text="Your message here" />
// </div>;
