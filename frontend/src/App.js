import { Route, Routes } from "react-router-dom";
import "./App.css";
import MasterLayout from "./layouts/admin/MasterLayout";
import "./all.min.css";
import SignUp from "./layouts/front/SignUp";
import Login from "./layouts/front/Login";
import UpdateUser from "./Components/admin/users/UpdateUser";
import NewUser from "./Components/admin/users/NewUser";
import Home from "./layouts/front/Home";
import RequireAuth from "./layouts/front/RequireAuth";
import PersistLogin from "./layouts/front/PersistLogin";
import Products from "./Components/admin/products/Products";
import NewProduct from "./Components/admin/products/NewProduct";
import UpdateProduct from "./Components/admin/products/UpdateProduct";
import Users from "./Components/admin/users/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* protecte Route */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<MasterLayout />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<NewUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
