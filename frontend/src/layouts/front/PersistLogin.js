import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { user } from "../../Context/UserContext";
import Loading from "../../Components/front/Loading";
import Cookies from "universal-cookie";

function PersistLogin() {
  const [loading, setLoading] = useState(true);

  const context = useContext(user);
  const token = context.auth.token;

  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  console.log(getToken);

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token, { path: "/" });
            context.setAuth((prev) => {
              return { userDetails: data.data.user, token: data.data.token };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    !token ? refresh() : setLoading(false);
  }, []);
  return loading ? <Loading /> : <Outlet />;
}

export default PersistLogin;
