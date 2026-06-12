import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)

  return (
    <Row>
      <Col md={8}>
        <h1 className='mb-4'>Tvoja korpa</h1>
        {cartItems.length === 0 ? (
          <Message>
            Korpa je prazna. <Link to='/'>Vrati se na ponudu</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className='py-3' style={{ background: 'transparent' }}>
                <Row className='align-items-center'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`} className='fw-semibold'>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price.toFixed(2)} RSD</Col>
                  <Col md={3}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className='shadow-sm mt-3' style={{ background: 'var(--paper-card)', border: '1px solid var(--line)', borderRadius: '16px' }}>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ background: 'transparent' }}>
              <h2 className='h4'>Ukupno ({totalItems} {totalItems === 1 ? 'proizvod' : 'proizvoda'})</h2>
              <h3 className='text-primary'>{totalPrice.toFixed(2)} RSD</h3>
            </ListGroup.Item>
            <ListGroup.Item style={{ background: 'transparent' }}>
              <Button type='button' variant='success' className='w-100' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Nastavi ka plaćanju
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen