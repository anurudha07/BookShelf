import React, { Component } from "react";
import { connect } from "react-redux";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../component/CheckoutSteps";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";

class PlaceOrder extends Component {
  constructor() {
    super();
    this.state = {
      itemsPrice: "",
      shippingPrice: "",
      taxPrice: "",
      totalPrice: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { cartItems, shippingAddress, paymentAddress } = this.props.getCartData;
    // Calculate prices
    const itemsPrice = cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 100;
    const taxPrice = this.addDecimals(Number((0.05 * itemsPrice).toFixed(2)));
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);

    this.setState({ itemsPrice, shippingPrice, taxPrice, totalPrice });
  }

  addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  placeOrderHandler = () => {
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = this.state;
    const { cartItems, shippingAddress, paymentAddress } = this.props.getCartData;

    // Dispatch Redux action to create order
    this.props.createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod: paymentAddress.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
  };

  componentDidUpdate(prevProps) {
    // Redirect on successful order creation
    if (
      this.props.getOrderData.order &&
      this.props.getOrderData.order !== prevProps.getOrderData.order
    ) {
      const orderId = this.props.getOrderData.order._id;
      localStorage.removeItem("cartItems");
      this.props.history.push(`/order/${orderId}`);
    }
  }

  render() {
    const cart = this.props.getCartData;
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = this.state;

    if (!cart.cartItems || cart.cartItems.length === 0) {
      return <Loader />;
    }

    return (
      <Container className="py-5">
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Shipping:</h4>
                <p>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Payment:</h4>
                <p>Method: {cart.paymentAddress.paymentMethod}</p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Order Items:</h4>
                {cart.cartItems.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x ${item.price} = ${
                              (item.qty * item.price).toFixed(2)
                            }
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems.length === 0 || this.props.getLoginInfoData.userInfo.isAdmin}
                    onClick={this.placeOrderHandler}
                  >
                    Place Order
                  </Button>
                  {this.props.getLoginInfoData.userInfo.isAdmin && (
                    <small className="text-muted">
                      You cannot purchase your own product
                    </small>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  getLoginInfoData: state.userLogin,
  getCartData: state.cart,
  getOrderData: state.createOrder,
});

export default connect(mapStateToProps, { createOrder })(PlaceOrder);
