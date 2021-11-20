import { useContext } from 'react';

import UserContext from '../UserContext';

function Home() {

  const context = useContext(UserContext);

  let message;

  // Handle if user is not logged in
  if (context.loggedInUser === null) {
    message = (
      <div>
        You are not logged in.
      </div>
    );
  } 
  
  // Handle if user is logged in
  else {

    // Get a reference to the logged in user
    let user = context.loggedInUser;
    let balance = context.balance;

    // Update the message with the user's information
    message = (
      <div>
        Welcome back, {user}!
        <br/>
        Your balance is ${balance}.
      </div>
    );   
  }

  return (
    <div className='content'>
      <h2>Home</h2>
      {message}
    </div>
  );
}

export default Home;