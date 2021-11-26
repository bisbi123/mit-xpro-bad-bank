import { useContext } from 'react';
import * as Bootstrap from 'react-bootstrap';
import UserContext from './UserContext'

function NavBar(props) {
  const context = useContext(UserContext);
  let user = null;
  if (context !== null){
    user = context.loggedInUser
  }

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
        <Bootstrap.Nav className="ml-auto">
          <Bootstrap.Navbar.Text>
                { props.isLoggedIn && <a>{user}</a>}
                {!props.isLoggedIn && <a href="/#/login">Not Logged In YO</a>}
          </Bootstrap.Navbar.Text>
        </Bootstrap.Nav>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
  );
}

export default NavBar;