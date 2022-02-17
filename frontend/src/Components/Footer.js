import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-3">
      <Container>
        <Row>
          <Col className="text-center py-2">
            <p className="my-auto">Patro @ {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
