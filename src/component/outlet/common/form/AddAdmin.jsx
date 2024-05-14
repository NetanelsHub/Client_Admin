import React, { useContext, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LabelAndFiled from "../element/LabelAndFiled"
import SelectRoll from "../element/SelectRoll";
import { globalContext } from "../../../../helper/GlobalContext";
import Button from "../element/Button";

// const initialValues = {
//   admin_email: "",
//   admin_password: "",
//   admin_fName: "",
//   admin_lName: "",
//   admin_role: "",
// };

export default function AddAdmin() {
  const { addSuperUser, setShowModal, updateUser, setUpdateUser , optionSelection,setOptionSelection,addSubmit , setAddSubmit ,upDateSuperUser,id } = useContext(globalContext);
 

  const initialValues = {
    admin_email: optionSelection ? updateUser.admin_email : "",
    admin_password:  "",
    admin_fName: optionSelection ? updateUser.admin_fName:  "",
    admin_lName: optionSelection ? updateUser.admin_lName :"",
    admin_role: "",
  };
 
  const objectSchema = Yup.object({
    admin_email: Yup.string()
      .email("email must be valid email")
      .required("Email is Required"),
      admin_password: addSubmit
      ? Yup.string()
          .min(5, "Password must be at least 5 characters")
          .max(12, "Password cannot be greater than 12 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Password must contain at least one lowercase letter and one uppercase letter"
          )
          .required("Password is required")
      : Yup.string().notRequired(),
    admin_role: Yup.string()
      .oneOf(["Admin", "Editor Manager"], "Invalid role")
      .required("Role is required"),
    admin_fName: Yup.string().required("First Name is required"),
    admin_lName: Yup.string().required("Last Name is required"),
  });

  function handleAddSubmit(values) {
    console.log("in handleAddSubmit ")
    // console.log("Form submitted with values:", values);
    addSuperUser(values)
    setShowModal(false)
  
  }

  // if  OptionSelection = true , this function will trigger  else  handleAddSubmit will trigger
  function handleUpdateSubmit(values,id) {
   // the id only  to check if i get the id og specifics td of thi user
    console.log("in handleUpdateSubmit and the id is :", id)
    
    // call for req server
    upDateSuperUser(values)
  }
  
  return (
                                                                            // if addSubmit is true the onSubmit button should be handleAddSubmit
    <Formik
     initialValues={initialValues} 
     validationSchema={objectSchema}  
     onSubmit={addSubmit ?handleAddSubmit : handleUpdateSubmit}>

      <Form className="max-w-sm mx-auto">
        <LabelAndFiled name="fName" lbl_txt=" Enter First Name"  />
        <LabelAndFiled name="lName" lbl_txt=" Enter Last Name"  />
        <LabelAndFiled name="email" lbl_txt=" Enter Email"  />
        {/* //  if user on update form , this label not need to show up */}
        {!optionSelection && <LabelAndFiled name="password" lbl_txt=" Enter Password" />}
        <SelectRoll name="role" />

        <Button btn_txt={"Submit"} btn_type={"Submit"}/>
      </Form>
    </Formik>
  )
}

{/* <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button> */}