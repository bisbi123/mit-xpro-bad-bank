import React from 'react';
import * as Bootstrap from 'react-bootstrap';

class NavBar extends React.Component{
  render(){
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
                  { this.props.isLoggedIn && <a>{this.props.ctx.loggedInUser}</a>}
                  {!this.props.isLoggedIn && <a href="/#/login">Not Logged In YO</a>}
            </Bootstrap.Navbar.Text>
          </Bootstrap.Nav>
        </Bootstrap.Container>
      </Bootstrap.Navbar>
    );
  }
}

export default NavBar;