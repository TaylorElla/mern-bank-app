// Navbar.js
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';


const CustomNavbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <div className="brand-content">
            <img
              alt=""
              src="/images/bank5.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <h5>BankApp</h5>
          </div>
        </Navbar.Brand>



        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user && (
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/MyAccount">
                  MyAccount
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}

          <Nav className="ml-auto">
          {user && (
            <>
              <Nav.Item>
                <Nav.Link><span>{user.email}</span></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="outline-primary" onClick={handleClick}>
                  Log out
                </Button>
              </Nav.Item>
            </>
          )}
            {!user && (
              <>
                <Nav.Item className="authLinks">
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="authLinks">
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
