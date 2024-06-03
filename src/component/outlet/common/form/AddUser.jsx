// // the form for add Client

// import { useContext } from 'react'
// import { Formik, Form } from "formik";
// import LabelAndFiled from "../element/LabelAndFiled"
// import * as Yup from "yup";
// import { globalContext } from "../../../../helper/GlobalContext";
// import Button from '../element/Button';
// import { clientContext } from '../../../../helper/ClientContext';


// export default function AddUser() {
//   const { addSubmit, setShowModal } = useContext(globalContext)
//   const { addClient,  setCrudClients ,onAddClient,setOnAddClient,clientInfo,upDateClient} = useContext(clientContext)

//   const initialValues = {
//     client_email:!onAddClient ? clientInfo.client_email :  "",
//     client_password: "",
//     client_fName: !onAddClient ? clientInfo.client_fName : "",
//     client_lName:!onAddClient ? clientInfo.client_lName : "",
//   };

//   const objectSchema = Yup.object({
//     client_email: Yup.string()
//       .email("email must be valid email")
//       .required("Email is Required"),
//       // we  don`t let  the admin to change client password so if onAddClient true pass required 
//       // if its false we on update and password not required
//     client_password: onAddClient ?
//       Yup.string()
//         .min(5, "Password must be at least 5 characters")
//         .max(12, "Password cannot be greater than 12 characters")
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])/,
//           "Password must contain at least one lowercase letter and one uppercase letter"
//         )
//         .required("Password is required")
//       : Yup.string().notRequired(),

//     client_fName: Yup.string().required("First Name is required"),
//     client_lName: Yup.string().required("Last Name is required"),
//   });

//   function handleAddSubmit(values) {
//     // to add client 
//     console.log("we in add user submit")
//     setOnAddClient(true)
//     addClient(values)
//     setShowModal(false)
//   }

//   function handleUpdateSubmit(values){
//     // // need to add her the request  to server for update
//     upDateClient(values)
//     setShowModal(false)

//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={objectSchema}
//        onSubmit={onAddClient ? handleAddSubmit : handleUpdateSubmit}
//       // onSubmit={handleAddSubmit}
//     >

//       <Form className="max-w-sm mx-auto">
//         <LabelAndFiled name="client_fName" lbl_txt=" Enter First Name" />
//         <LabelAndFiled name="client_lName" lbl_txt=" Enter Last Name" />
//         <LabelAndFiled name="client_email" lbl_txt=" Enter Email" />
//        {onAddClient && <LabelAndFiled name="client_password" lbl_txt=" Enter Password" /> }
//         <Button btn_txt={"Submit"} btn_type={"Submit"} />
//       </Form>
//     </Formik>
//   )
// }
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const url = "http://localhost:3000/user/resetPassword";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .max(12, "Password cannot be greater than 12 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Password must contain at least one lowercase letter and one uppercase letter"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function ResetPassword() {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const id = query.get("uid");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    try {
      await validationSchema.validate({ password, confirm_password: confirmPassword }, { abortEarly: false });
      const { data } = await axios.post(`${url}?token=${token}&uid=${id}`, { password });
      if (data.success) {
        navigate("/login");
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.log(err);
        alert("An error occurred");
      }
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
