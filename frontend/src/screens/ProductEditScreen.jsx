import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: productId,
        name, price, image, category, countInStock, description,
      }).unwrap();
      toast.success('Proizvod sačuvan');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Nazad
      </Link>
      <FormContainer>
        <h1>Izmena proizvoda</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Cena (din.)</Form.Label>
              <Form.Control type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Slika (putanja)</Form.Label>
              <Form.Control type="text" placeholder="/images/jabuka.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control type="text" placeholder="Voće / Povrće" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Količina na stanju</Form.Label>
              <Form.Control type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Opis</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Button type="submit" variant="primary" className="fresko-btn-full mt-2" disabled={loadingUpdate}>
              Sačuvaj izmene
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;