import { lazy, Suspense, useContext } from "react";
import Nav from "./component/static/Nav";
const Home = lazy(() => import("./component/outlet/pages/Home"));
const Login = lazy(() => import("./component/outlet/common/form/Login"));
const Management = lazy(() => import("./component/outlet/pages/Management"));
const Product = lazy(() => import("./component/outlet/pages/Product"));


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
        <Route
          index
          element={show ? <Navigate to={"/"} /> : <Navigate to={"/login"} />}

        />
        <Route path="home" element={<Home />} />
        <Route path="management" element={<Management />} />
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
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
