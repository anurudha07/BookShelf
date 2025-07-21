import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./_popular.css";

export default class PopularProducts extends Component {
  _isMounted = false;
  state = { topProduct: null };

  componentDidMount() {
    this._isMounted = true;
    axios.get("/api/products/top/product")
      .then(({ data }) => {
        if (this._isMounted && data.length >= 3) {
          this.setState({ topProduct: data });
        }
      })
      .catch(console.error);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { topProduct } = this.state;
    if (!topProduct) return <Loader />;
    return (
      <>
        <h2>Popular Products</h2>
        <Row>
          <Col>
            <Link to={`/product/${topProduct[0]._id}`}>
              <img
                src={topProduct[0].image}
                alt={topProduct[0].name}
                className="top_0_product"
              />
            </Link>
          </Col>
          <Col>
            {[1,2].map(i => (
              <Link key={i} to={`/product/${topProduct[i]._id}`}>
                <img
                  src={topProduct[i].image}
                  alt={topProduct[i].name}
                  className="top_1_product"
                />
              </Link>
            ))}
          </Col>
        </Row>
      </>
    );
  }
}
