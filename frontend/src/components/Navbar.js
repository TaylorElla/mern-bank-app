// Navbar.js
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const CustomNavbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="brand-content">
            <img
              alt=""
              src="/images/bank5.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <h5>Bank-App</h5>
          </div>
        </Navbar.Brand>

        {user && (
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/MyAccount">
                MyAccount
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user && (
              <Nav.Item className="nav-link">
                <span>{user.email}</span>
                <Button variant="outline-primary" onClick={handleClick}>
                  Log out
                </Button>
              </Nav.Item>
            )}
            {!user && (
              <Nav.Item className="authLinks">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
