import { lazy, Suspense, useContext } from "react";
import Nav from "./component/static/Nav";
const Home = lazy(() => import("./component/outlet/pages/Home"));
const Login = lazy(() => import("./component/outlet/common/form/Login"));
const Management = lazy(() => import("./component/outlet/pages/Management"));
const Product = lazy(() => import("./component/outlet/pages/Product"));
const users = lazy(()=> import("./component/outlet/pages/Users"))

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



function Root() {
  const { show } = useContext(globalContext)
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
  const { show } = useContext(globalContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login />} />

        <Route
          path="/"
          element={show ? <Outlet /> : <Navigate to={"/login"} />}

        >
        <Route path="home" element={<Home />} />
        <Route path="management" element={<Management />} />
        <Route path="product" element={<Product />} />
        <Route path="users" element={<Users />} />
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
