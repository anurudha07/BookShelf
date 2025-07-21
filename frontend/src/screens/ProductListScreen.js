import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import Loader from "../component/Loader";
import Message from "../component/Message"; // assume a Message component exists
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (successCreate) {
        history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts());
      }
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container className="mt-5 p-5">
      <Row className="align-items-center">
        <Col><h2>Products</h2></Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th><th>NAME</th><th>PRICE</th>
              <th>CATEGORY</th><th>BRAND</th><th>IN STOCK</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="7">No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
