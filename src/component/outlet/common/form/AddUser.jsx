// the form for add Client

import { useContext } from 'react'
import { Formik, Form } from "formik";
import LabelAndFiled from "../element/LabelAndFiled"
import * as Yup from "yup";
import { globalContext } from "../../../../helper/GlobalContext";
import Button from '../element/Button';
import { clientContext } from '../../../../helper/ClientContext';


export default function AddUser() {
  const { addSubmit, setShowModal } = useContext(globalContext)
  const { addClient,  setCrudClients ,onAddClient,setOnAddClient,clientInfo,upDateClient} = useContext(clientContext)

  const initialValues = {
    client_email:!onAddClient ? clientInfo.client_email :  "",
    client_password: "",
    client_fName: !onAddClient ? clientInfo.client_fName : "",
    client_lName:!onAddClient ? clientInfo.client_lName : "",
  };

  const objectSchema = Yup.object({
    client_email: Yup.string()
      .email("email must be valid email")
      .required("Email is Required"),
      // we  don`t let  the admin to change client password so if onAddClient true pass required 
      // if its false we on update and password not required
    client_password: onAddClient ?
      Yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(12, "Password cannot be greater than 12 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])/,
          "Password must contain at least one lowercase letter and one uppercase letter"
        )
        .required("Password is required")
      : Yup.string().notRequired(),

    client_fName: Yup.string().required("First Name is required"),
    client_lName: Yup.string().required("Last Name is required"),
  });

  function handleAddSubmit(values) {
    // to add client 
    console.log("we in add user submit")
    setOnAddClient(true)
    addClient(values)
    setShowModal(false)
  }

  function handleUpdateSubmit(values){
    // // need to add her the request  to server for update
    upDateClient(values)
    setShowModal(false)

  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={objectSchema}
       onSubmit={onAddClient ? handleAddSubmit : handleUpdateSubmit}
      // onSubmit={handleAddSubmit}
    >

      <Form className="max-w-sm mx-auto">
        <LabelAndFiled name="client_fName" lbl_txt=" Enter First Name" />
        <LabelAndFiled name="client_lName" lbl_txt=" Enter Last Name" />
        <LabelAndFiled name="client_email" lbl_txt=" Enter Email" />
       {onAddClient && <LabelAndFiled name="client_password" lbl_txt=" Enter Password" /> }
        <Button btn_txt={"Submit"} btn_type={"Submit"} />
      </Form>
    </Formik>
  )
}
