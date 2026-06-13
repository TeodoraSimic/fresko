import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../slices/productsApiSlice';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Sigurno želiš da obrišeš ovaj proizvod?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Proizvod obrisan');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Kreirati novi (prazan) proizvod za uređivanje?')) {
      try {
        await createProduct().unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col><h1>Proizvodi</h1></Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaPlus /> Dodaj proizvod
          </Button>
        </Col>
      </Row>

      {(loadingCreate || loadingDelete) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAZIV</th>
              <th>CENA</th>
              <th>KATEGORIJA</th>
              <th>ZALIHE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price} din.</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;