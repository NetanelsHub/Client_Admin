import { useContext } from 'react'
import { Formik, Form } from "formik";
import LabelAndFiled from "../element/LabelAndFiled"
import * as Yup from "yup";
import { globalContext } from "../../../../helper/GlobalContext";
import Button from '../element/Button';
import { clientContext } from '../../../../helper/ClientContext';


export default function AddUser() {
  const { addSubmit, setShowModal } = useContext(globalContext)
  const { addClient,  setCrudClients } = useContext(clientContext)

  const initialValues = {
    client_email: "",
    client_password: "",
    client_fName: "",
    client_lName: "",
  };

  const objectSchema = Yup.object({
    client_email: Yup.string()
      .email("email must be valid email")
      .required("Email is Required"),
    client_password:
      Yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(12, "Password cannot be greater than 12 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])/,
          "Password must contain at least one lowercase letter and one uppercase letter"
        )
        .required("Password is required"),
    //   : Yup.string().notRequired(),

    client_fName: Yup.string().required("First Name is required"),
    client_lName: Yup.string().required("Last Name is required"),
  });

  function handleAddSubmit(values) {
    console.log("we in add user submit")
    addClient(values)
    setShowModal(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={objectSchema}
      // onSubmit={addSubmit ?handleAddSubmit : handleUpdateSubmit}
      onSubmit={handleAddSubmit}
    >

      <Form className="max-w-sm mx-auto">
        <LabelAndFiled name="client_fName" lbl_txt=" Enter First Name" />
        <LabelAndFiled name="client_lName" lbl_txt=" Enter Last Name" />
        <LabelAndFiled name="client_email" lbl_txt=" Enter Email" />
        <LabelAndFiled name="client_password" lbl_txt=" Enter Password" />
        <Button btn_txt={"Submit"} btn_type={"Submit"} />
      </Form>
    </Formik>
  )
}
