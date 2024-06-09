import { useContext, useEffect } from "react";
import { globalContext } from "../../../../helper/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LabelAndFiled from "../element/LabelAndFiled";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const url = "https://www.googleapis.com/oauth2/v3/userinfo";

const initialValues = {
  admin_email: "",
  admin_password: "",
};

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

export default function Login() {
  const navigate = useNavigate();
  const { show, setShow, loginAdmin, loginWithGoogle } = useContext(globalContext);

  async function handleSubmit(values) {
    try {
      await loginAdmin(values);

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  useEffect(() => {
    if (show) {
      const loc = localStorage.getItem("loc") ?? "/home";
      navigate(`${loc}`);
    }
  }, [show]);

  const loginFromGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        await loginWithGoogle(data.email);

      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={objectSchema}
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-600">
        <Form className="w-1/4 mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
          <LabelAndFiled name="admin_email" lbl_txt="Your email" />
          <LabelAndFiled name="admin_password" lbl_txt="Your password" />
          <div className="mb-5">
            <Link
              to="ForgotPassword"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <button
              type="button"
              onClick={loginFromGoogle}
              className="w-full flex items-center justify-center text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 border border-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-600 dark:text-white"
            >
              <FcGoogle className="mr-2" size={25} />
              Sign in with Google
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
