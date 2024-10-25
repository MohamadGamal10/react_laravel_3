import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../../Context/UserContext";

function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  console.log(image);

  const context = useContext(user);
  const Token = context.auth.token;

  const formdata = new FormData();
  formdata.append("title", title);
  formdata.append("description", description);
  formdata.append("image", image);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    //   if (name === "" || pass.length < 8 || passr !== pass) {
    //     flag = false;
    //   } else flag = true;

    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/create`,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );

      nav("/dashboard/products");

      // if(res.status === 200){
      //   props.hasLocalstorage && window.localStorage.setItem("email", email);
      //   window.location.pathname = `/${props.navigate}`;
      // }
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }

  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length < 1 && accept && (
            <p className="error">title is required</p>
          )}
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
            value={description}
            required
            onChange={(e) => setDesciption(e.target.value)}
          />
          {/* {accept && emailError === 422 && (
              <p className="error">Email is already token</p>
            )} */}
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            placeholder="image"
            required
            onChange={(e) => setImage(e.target.files.item(0))}
          />
          {/* {pass.length < 8 && accept && (
              <p className="error">Password must be more than 8 char</p>
            )} */}
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-success px-4 mt-2">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
