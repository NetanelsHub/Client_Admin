import { lazy, Suspense, useContext } from "react";
import Nav from "./component/static/Nav";
import ForgotPassword from "./component/outlet/pages/ForgotPassword";
import ResetPassword from "./component/outlet/pages/ResetPassword";
const Dashboard = lazy(() => import("./component/outlet/pages/Dashboard"));
const Login = lazy(() => import("./component/outlet/common/form/Login"));
const Admins = lazy(() => import("./component/outlet/pages/Admins"));
const Product = lazy(() => import("./component/outlet/pages/Product"));
const Orders = lazy(() => import("./component/outlet/pages/Orders"));
import Users from "./component/outlet/pages/Users";
import ChatBot from "./component/outlet/common/element/ChatBot";
// import ErrorPage from "./component/outlet/common/element/ErrorPage"


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { globalContext } from "./helper/GlobalContext"


function Root() {
  const { show, adminRole } = useContext(globalContext)
  return (
    <>
      {show && <Nav />}
      <Suspense fallback={<div>loading ...</div>}>
        <Outlet />
      </Suspense>
      {/* <ChatBot /> */}
    </>
  );
}

function App() {
  const { show, adminRole ,setAdminRole } = useContext(globalContext)
  // i  get the admin roll from the local Storage to avoid the refresh problem !
  // when i refresh because i don't rerender the login function i lost it the value.
  // setAdminRole(localStorage.getItem('adminRole') || '')

  const router = createBrowserRouter(
    createRoutesFromElements(
      //errorElement={<ErrorPage/>}
      <Route path="/" element={<Root />} > ;

        <Route path="login" element={<Login fallback={<div>loading ...</div>} />} />
        <Route path="login/ForgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />

        <Route
          path="/"
          element={show ? <Outlet /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Dashboard />} />
          {/* only admin  can enter the management  */}
      
          <Route path="home" element={<Dashboard />} />
          {adminRole === "Admin" && <Route path="Admins" element={<Admins />} />}
          <Route path="product" element={<Product />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        

        </Route>

      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
