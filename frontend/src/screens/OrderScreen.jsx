import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Označeno kao isporučeno');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1>Narudžbina {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Dostava</h2>
              <p><strong>Ime: </strong>{order.user.name}</p>
              <p><strong>Email: </strong>{order.user.email}</p>
              <p>
                <strong>Adresa: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Isporučeno: {order.deliveredAt?.substring(0, 10)}</Message>
              ) : (
                <Message variant="danger">Nije isporučeno</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Plaćanje</h2>
              <p><strong>Metod: </strong>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Plaćeno: {order.paidAt?.substring(0, 10)}</Message>
              ) : (
                <Message variant="danger">Nije plaćeno</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Stavke</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                    <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                    <Col md={4}>
                      {item.qty} x {item.price} din. = {(item.qty * item.price).toFixed(2)} din.
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Pregled</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Stavke</Col><Col>{order.itemsPrice} din.</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Dostava</Col><Col>{order.shippingPrice} din.</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>PDV</Col><Col>{order.taxPrice} din.</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col><strong>Ukupno</strong></Col><Col><strong>{order.totalPrice} din.</strong></Col></Row></ListGroup.Item>

              {/* === OVDE u Koraku C ide PayPal dugme za plaćanje === */}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="fresko-btn-full" onClick={deliverHandler}>
                    Označi kao isporučeno
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;