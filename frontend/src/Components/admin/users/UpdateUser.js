import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { user } from "../../../Context/UserContext";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passr, setPassr] = useState("");
  const [accept, setAccept] = useState(false);

  const path = window.location.pathname;
  const id = path.slice(17);

  const context = useContext(user);
  const Token = context.auth.token;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
        headers: {
          Accept: "apllication/json",
          Authorization: "Bearer " + Token,
        },
      })
      .then((res) => {
        setName(res.data[0].name);
        setEmail(res.data[0].email);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
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

      if (res.status === 200) {
        window.location.pathname = "/dashboard/users";
      }
    } catch (err) {
      console.log(err.response.status);
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
