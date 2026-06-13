import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success(`Zdravo, ${res.name}! 🍒`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div className="fresko-auth-head">
        <span className="fresko-auth-emoji">🍒</span>
        <h1>Dobro došli nazad</h1>
        <div className="fresko-auth-sub">Drago nam je što te vidimo</div>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="naziv@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type="password" placeholder="Tvoja lozinka" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className="fresko-btn-full mt-2" disabled={isLoading}>
          Prijavi se
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col className="text-center">
          Nemaš nalog?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Registruj se</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;