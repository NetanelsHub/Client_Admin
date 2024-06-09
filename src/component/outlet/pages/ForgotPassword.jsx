
import React, { useState } from 'react';
import LabelAndInput from '../common/element/LabelAndInput';
import Button from '../common/element/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const url = "http://localhost:3000/user/forgotPassword";
  const [sendRecoverEmail, setSendRecoverEmail] = useState(false);
  const [admin_email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const admin_email = e.target.admin_email.value;
    setEmail(admin_email); // Set email state
    try {
      const { data } = await axios.post(url, { admin_email });
      console.log(data);
      setSendRecoverEmail(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {!sendRecoverEmail ? (
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <LabelAndInput name={"admin_email"} lbl_txt={"Enter Email"} type={"email"} />
                </div>
                <div className="flex space-x-4">
                  <Button btn_txt={"Reset password"} btn_type={"submit"} className="dark:bg-gray-700 dark:text-white" />
                  <Link to={"/login"} className="text-blue-500 dark:text-blue-300 hover:underline">Return to login</Link>
                </div>
              </form>
            </div>
          ) : (
            <a
            href={`https://mail.google.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-300 hover:underline"
            >
              Successfully sent recovery email. Click here to open Gmail.
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
