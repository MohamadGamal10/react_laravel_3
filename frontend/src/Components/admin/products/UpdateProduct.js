import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../../Context/UserContext";

function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [image, setImage] = useState("");
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const path = window.location.pathname;
  const id = path.slice(20);



  const context = useContext(user);
  const Token = context.auth.token;

  const formdata = new FormData();
  formdata.append("title", title);
  formdata.append("description", description);
  formdata.append("image", image);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "apllication/json",
          Authorization: "Bearer " + Token,
        },
      })
      .then((res) => {
        setTitle(res.data[0].title);
        setDesciption(res.data[0].description);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      // eslint-disable-next-line no-unused-vars
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`, formdata ,
        {
          headers: {
            Authorization: "Bearer " + Token,
          },
        }
      );

      if (res.status === 200) {
        window.location.pathname = "/dashboard/products";
      }
    } catch (err) {
      console.log(err.response.status);
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
