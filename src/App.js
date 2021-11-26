import { Route, HashRouter } from 'react-router-dom';

import UserContext from './UserContext.js';
import NavBar from './NavBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit.js';
import AllData from './pages/AllData.js';
import React from 'react';



// function App() {
//   return (
    // <HashRouter>
    //   <NavBar />
    //   <UserContext.Provider value={{
    //     loggedInUser: null
    //   }}>
    //     <Route path='/' exact component={Home} />
    //     <Route path='/create-account' component={CreateAccount} />
    //     <Route path='/login' component={Login} />
    //     <Route path='/deposit' component={Deposit} />
    //     <Route path='/all-data' component={AllData} />
    //   </UserContext.Provider>
    // </HashRouter>
//   );
// }
const isAuthenticated = false;

class App extends React.Component{
  
  login = () => {
    this.setState({ isAuthenticated: true });
    console.log("We logged in!")
  }

  logout = () => {
    this.setState({ isAuthenticated: false });
    console.log("We logged out!")
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    console.log(isLoggedIn);

    return (
      <HashRouter>
      <NavBar isLoggedIn={isAuthenticated} logout={this.logout} />
      <UserContext.Provider value={{
        loggedInUser: null
      }}>
        <Route path='/' exact component={Home} />
        <Route path='/create-account' component={CreateAccount} />
        <Route login={this.login} path='/login' component={Login} />
        <Route path='/deposit' component={Deposit} />
        <Route path='/all-data' component={AllData} />
      </UserContext.Provider>
    </HashRouter>
    )
  }

}

export default App;
