import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success(`Dobro došla, ${res.name}! 🧺`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div className="fresko-auth-head">
        <span className="fresko-auth-emoji">🧺</span>
        <h1>Napravi nalog</h1>
        <div className="fresko-auth-sub">Pridruži se FRESKO pijaci</div>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Ime i prezime</Form.Label>
          <Form.Control type="text" placeholder="Tvoje ime" value={name}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email adresa</Form.Label>
          <Form.Control type="email" placeholder="naziv@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type="password" placeholder="Izaberi lozinku" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Potvrdi lozinku</Form.Label>
          <Form.Control type="password" placeholder="Ponovi lozinku" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className="fresko-btn-full mt-2" disabled={isLoading}>
          Registruj se
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col className="text-center">
          Već imaš nalog?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Prijavi se</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;