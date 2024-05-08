import React, { useContext,useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LabelAndFiled from "../element/LabelAndFiled"
import SelectRoll from "../element/SelectRoll";
import {globalContext}  from "../../../../helper/GlobalContext";


const initialValues = {
  admin_email: "",
  admin_password: "",
  admin_fName: "",
  admin_lName: "",
  admin_role: "",
};

export default function AddAdmin() {
  const { addSuperUser ,setShowModal} = useContext(globalContext);
  
  const objectSchema = Yup.object({
    admin_email: Yup.string()
      .email("email must be valid email")
      .required("Email is Required"),
    admin_password: Yup.string()
      .min(5, "password must be at least 5 digits")
      .max(12, "password cant be greater than 12 digits")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain at least one lowercase letter and one uppercase letter"
      )
      .required("password isRequired"),
      admin_role: Yup.string()
      .oneOf(["Admin", "Editor Manager"], "Invalid role")
      .required("Role is required"),
    admin_fName: Yup.string().required("First Name is required"),
    admin_lName: Yup.string().required("Last Name is required"),
  });

  function handleAddSubmit(values){
    console.log("Form submitted with values:", values);
     addSuperUser(values)
     setShowModal(false)
     
  }

  return (
   
    <Formik initialValues={initialValues} validationSchema={objectSchema} onSubmit={handleAddSubmit}>
    
    <Form className="max-w-sm mx-auto">
        <LabelAndFiled name="fName" lbl_txt= " Enter First Name"/>
        <LabelAndFiled name="lName" lbl_txt= " Enter Last Name" />
        <LabelAndFiled name="email" lbl_txt= " Enter Email"  />
        <LabelAndFiled name="password" lbl_txt= " Enter Password" />
        <SelectRoll name = "role" />

        <button
         type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        
        >
          Submit
        </button>
      </Form>
    </Formik>
)
}
