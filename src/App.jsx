import { lazy, Suspense, useContext } from "react";
import Nav from "./component/static/Nav";
const Dashboard = lazy(() => import("./component/outlet/pages/Dashboard"));
const Login = lazy(() => import("./component/outlet/common/form/Login"));
const Management = lazy(() => import("./component/outlet/pages/Management"));
const Product = lazy(() => import("./component/outlet/pages/Product"));
// const users = lazy(() => import("./component/outlet/pages/Users"))


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { globalContext } from "./helper/GlobalContext"
import Users from "./component/outlet/pages/Users";
// import ErrorPage from "./component/outlet/common/element/ErrorPage"

const Orders = lazy(() => import("./component/outlet/pages/Orders"));



function Root() {
  const { show, adminRole } = useContext(globalContext)
  return (
    <>
      {show && <Nav />}
      <Suspense fallback={<div>loading ...</div>}>
        <Outlet />
      </Suspense>
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

        <Route path="login" element={<Login />} />

        <Route
          path="/"
          element={show ? <Outlet /> : <Navigate to={"/login"} />}
        >
          <Route index element={<Dashboard />} />
          {/* only admin  can enter the management  */}
          {/* {console.log("admin role:",adminRole)} */}
          <Route path="home" element={<Dashboard />} />
          {adminRole === "Admin" && <Route path="management" element={<Management />} />}
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
