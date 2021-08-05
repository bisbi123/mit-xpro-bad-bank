import * as Bootstrap from 'react-bootstrap';

function NavBar() {
  return (
    <Bootstrap.Navbar bg="dark" variant="dark">
      <Bootstrap.Container>
        <Bootstrap.Navbar.Brand href="/#">Navbar</Bootstrap.Navbar.Brand>
        <Bootstrap.Nav className="me-auto">
          <Bootstrap.Nav.Link href='/#'>Home</Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link href='/#/create-account'>Create Account</Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link href='/#/login'>Login</Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link href='/#/deposit'>Deposit</Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link href='/#/all-data'>All Data</Bootstrap.Nav.Link>
        </Bootstrap.Nav>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
  );
}

export default NavBar;