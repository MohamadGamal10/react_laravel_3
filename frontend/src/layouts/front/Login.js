import axios from "axios";
import React, { useContext, useState } from "react";
import Header from "../../Components/front/Header";
import { useNavigate } from "react-router-dom";
import { user } from "../../Context/UserContext";
import Cookies from "universal-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);
  const nav = useNavigate();

  const one = useContext(user);

  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: pass,
      });

      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;

      one.setAuth({ token, userDetails });

      nav("/dashboard");
    } catch (err) {
      if (err.status === 401) {
        setErr(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="parent">
        <div className="register">
          <form onSubmit={Submit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email"
              value={email || ""}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={pass || ""}
              onChange={(e) => setPass(e.target.value)}
            />
            {pass.length < 8 && accept && (
              <p className="error">Password must be more than 8 char</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-primary px-4 mt-2">
                Login
              </button>
            </div>
            {accept && err && (
              <p className="error">Password or Email is wrong</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
