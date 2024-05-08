import { useContext, useEffect } from "react";
import { globalContext } from "../../../../helper/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LabelAndFiled from "../element/LabelAndFiled";
// import {loginAdmin} from "../serverReq/Post"


const initialValues = {
  admin_email: "",
  admin_password: "",
};

export default function Login() {
  const navigate = useNavigate();
  // Accessing the context using useContext hook
  const { show, setShow ,loginAdmin} = useContext(globalContext);
  

  async function handleSubmit(values) {
    try {
      // console.log(values)
       // Reset error state
      await loginAdmin(values); // Call loginAdmin with form values
      setShow(true);
      navigate("/");
    } catch (error) {
      // console.error("Login failed:", error);
      // Handle login error, if necessary
      // setError("Invalid email or password");
  }
}
  useEffect(() => {
    if (show) {
      navigate("/");
    }
  },[show,navigate]);

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
  });
  

  return (
    <Formik initialValues={initialValues} validationSchema={objectSchema} onSubmit={handleSubmit} >
      <Form  className="max-w-sm mx-auto">
        <LabelAndFiled name="email" lbl_txt="Your email" />
        <LabelAndFiled name="password" lbl_txt="Your password" />
        <div className="mb-5">
          <a
            href="/forgot-password"
            className="block text-sm text-gray-900 dark:text-white mb-2"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
}
