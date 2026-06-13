import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import logo from '../assets/logo.png'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.error('Odjava nije uspela:', err)
    }
  }

  return (
    <header>
      <Navbar className="fresko-navbar" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img src={logo} alt="FRESKO" height="36" className="me-0" />
              <span><span className="fw-semibold">FRESKO</span> — sveže voće i povrće</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Korpa
                  {cartItems.length > 0 && (
                    <Badge pill bg="light" text="dark" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Odjava</NavDropdown.Item>
                  </NavDropdown>

                  {userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminmenu">
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Proizvodi</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Prijava
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header