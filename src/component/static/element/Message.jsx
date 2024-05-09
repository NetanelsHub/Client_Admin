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
        <div className="fixed top-25 left-0 right-0 z-50 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="px-4 py-2">
              <p className="text-green-800">{text}</p>
            </div>
          </div>
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
