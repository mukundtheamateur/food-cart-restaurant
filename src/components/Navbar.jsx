import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";

function BasicExample() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const logout = async () => {
    const data = await axios.post(
      "http://localhost:4000/logout",
      {},
      { withCredentials: true }
    );
    if (data.status === 200) {
      window.location.href = "/";
    }
  };
  return (
    <Navbar expand="lg" className="navbar-custom sticky-top bg-primary">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">
          <span className="text-white text-decoration-underline">SpeedRestro</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/cart" className="text-white">
            Cart 🛒
            </Nav.Link>
            <Nav.Link href="/order" className="text-white">
              Order
            </Nav.Link>
            {isAuthenticated ? (
              <button className="btn btn-outline-light" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Nav.Link href="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link href="/signup" className="text-white">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
