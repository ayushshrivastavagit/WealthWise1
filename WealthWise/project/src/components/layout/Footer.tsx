import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 small">© 2024 WealthWise. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 small">Made by Ayush Shrivastava</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;