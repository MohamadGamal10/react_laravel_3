import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { user } from "../../../Context/UserContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [runEffect, setRun] = useState(0);

  const context = useContext(user);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((item) => setProducts(item.data))
      .catch((err) => console.log(err));
  }, [runEffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showProducts = products.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>
        <i
          onClick={() => {
            deleteUser(item.id);
          }}
          className="fa-solid fa-trash"
          style={{
            color: "red",
            fontSize: "20px",
            paddingRight: "15px",
            cursor: "pointer",
          }}
        ></i>

        <Link to={`${item.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
          ></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <Table className="text-center" bordered hover size="lg">
        <thead className="table-light">
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{showProducts}</tbody>
      </Table>
    </>
  );
}

export default Products;
