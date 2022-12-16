import React, { useContext, useEffect, useReducer } from "react";
import LoadingBox from "../components/LoadingBox";

import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/products";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { getError } from "../utils";
import Button from "react-bootstrap/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        Navigate(`/admin/product/${data.product}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>jullien</title>
      </Helmet>

      <Row style={{ left: "0" }}>
        <Col>
          <h1>Items</h1>
        </Col>

        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Post item
            </Button>
          </div>
        </Col>
      </Row>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map &&
              products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
