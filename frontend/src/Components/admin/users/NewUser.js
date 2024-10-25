import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../../Context/UserContext";

function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passr, setPassr] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  const context = useContext(user);
  const Token = context.auth.token;

  async function Submit(e) {
    let flag = true;

    e.preventDefault();
    setAccept(true);

    if (name === "" || pass.length < 8 || passr !== pass) {
      flag = false;
    } else flag = true;

    try {
      if (flag) {
        // eslint-disable-next-line no-unused-vars
        let res = await axios.post(
          `http://127.0.0.1:8000/api/user/create`,
          {
            name: name,
            email: email,
            password: pass,
            password_confirmation: passr,
          },
          {
            headers: {
              Authorization: "Bearer " + Token,
            },
          }
        );

        nav("/dashboard/users");

        // if(res.status === 200){
        //   props.hasLocalstorage && window.localStorage.setItem("email", email);
        //   window.location.pathname = `/${props.navigate}`;
        // }
      }
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          {name === "" && accept && <p className="error">name is required</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email || ""}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {accept && emailError === 422 && (
            <p className="error">Email is already token</p>
          )}
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
          <label htmlFor="repeat">Repeat Password</label>
          <input
            id="repeat"
            type="password"
            placeholder="repeat password"
            value={passr || ""}
            onChange={(e) => setPassr(e.target.value)}
          />
          {passr !== pass && accept && (
            <p className="error">Password don't match</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-success px-4 mt-2">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
