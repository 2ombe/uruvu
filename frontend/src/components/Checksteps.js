import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function CheckSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Signin</Col>
      <Col className={props.step2 ? "active" : ""}>Your Info</Col>
      <Col className={props.step3 ? "active" : ""}>Ishyura</Col>
      <Col className={props.step4 ? "active" : ""}>Emeza Gutumiza</Col>
    </Row>
  );
}
