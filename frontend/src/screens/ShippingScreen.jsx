import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || 'Srbija');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Adresa za dostavu</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Adresa</Form.Label>
          <Form.Control type="text" placeholder="Ulica i broj" value={address}
            onChange={(e) => setAddress(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>Grad</Form.Label>
          <Form.Control type="text" placeholder="Grad" value={city}
            onChange={(e) => setCity(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Poštanski broj</Form.Label>
          <Form.Control type="text" placeholder="npr. 21000" value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Država</Form.Label>
          <Form.Control type="text" placeholder="Država" value={country}
            onChange={(e) => setCountry(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="fresko-btn-full mt-2">
          Nastavi
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;