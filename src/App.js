import { Route, HashRouter } from 'react-router-dom';

import UserContext from './UserContext.js';
import NavBar from './NavBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import AllData from './pages/AllData.js';

function App() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={{
        users: [
          { username: 'acrist', password: 'password', balance: '10' }
        ]
      }}>
        <Route path='/' exact component={Home} />
        <Route path='/create-account' component={CreateAccount} />
        <Route path='/login' component={Login} />
        <Route path='/all-data' component={AllData} />
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
