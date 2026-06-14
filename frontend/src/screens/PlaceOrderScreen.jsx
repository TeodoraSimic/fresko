import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Dostava</h2>
              <p>
                <strong>Adresa: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Način plaćanja</h2>
              <strong>Metod: </strong>{cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Stavke</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Korpa je prazna</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} din. = {(item.qty * item.price).toFixed(2)} din.
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
              <ListGroup.Item><h2>Pregled narudžbine</h2></ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Stavke</Col><Col>{cart.itemsPrice} din.</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Dostava</Col><Col>{cart.shippingPrice} din.</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>PDV</Col><Col>{cart.taxPrice} din.</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col><strong>Ukupno</strong></Col><Col><strong>{cart.totalPrice} din.</strong></Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="fresko-btn-full"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Potvrdi narudžbinu
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;