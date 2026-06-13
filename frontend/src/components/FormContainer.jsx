import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={5}>
          <div className="fresko-form-card">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;