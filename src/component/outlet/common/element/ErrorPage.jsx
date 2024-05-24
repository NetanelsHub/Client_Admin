import React from 'react'
import { Link } from 'react-router-dom';
import errorPic from  "../../../../assets/error.jpg"

export default function ErrorPage() {
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <img
              src= {errorPic}
              alt="Access Denied"
              className="w-32 h-32 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-8">
              Sorry, this page is only accessible to admins.
            </p>
            <Link to="/home">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      );
}
