import React from 'react';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.message="";
  }

  render(){
     // Handle if user is not logged in
     if (this.props.ctx.loggedInUser === null) {
      this.message = (
        <div>
          You are not logged in.
        </div>
      );
    } 
    
    // Handle if user is logged in
    else {

      // Get a reference to the logged in user
      let user = this.props.ctx.loggedInUser;
      let balance = this.props.ctx.balance;

      // Update the message with the user's information
      this.message = (
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
        {this.message}
      </div>
    );
  }
}

export default Home;