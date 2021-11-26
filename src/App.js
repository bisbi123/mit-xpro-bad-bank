import { Route, HashRouter } from 'react-router-dom';

import UserContext from './UserContext.js';
import NavBar from './NavBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit.js';
import AllData from './pages/AllData.js';
import React from 'react';


class App extends React.Component{
  
  
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: false,
      ctx : {
        loggedInUser: null,
        email: null,
        balance: null
      }

    }
    
  }
  
  login = () => {
    this.setState({ isAuthenticated: true });
    console.log("We logged in!")
  }

  logout = () => {
    this.setState({ isAuthenticated: false });
    this.setState({ctx:{
      loggedInUser: null,
      email: null,
      balance: null
    }})
  }
  render() {    

    return (
      <HashRouter>
        <NavBar isLoggedIn={this.state.isAuthenticated} ctx={this.state.ctx} logout={this.logout} />
        <UserContext.Provider value={{
          loggedInUser: null
        }}>
          <Route path='/' exact>
            <Home ctx={this.state.ctx}/>
          </Route>
          <Route path='/create-account' component={CreateAccount} />
          <Route path='/login'>
            <Login ctx={this.state.ctx} login={this.login}/>
          </Route>
          
          <Route path='/deposit' component={Deposit} />
          <Route path='/all-data' component={AllData} />
        </UserContext.Provider>
    </HashRouter>
    )
  }

}

export default App;
