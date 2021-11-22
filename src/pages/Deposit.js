import { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import UserContext from '../UserContext.js';
var clicked = false;
function onDeposit(){
  clicked = true;
}

async function deposit(email, amount) {
  if (!clicked){
    return [false, null];
  }
  else{
    clicked = false;
    let resp = await fetch(`http://localhost:5000/account/update/${email}/${amount}`);
    if (resp.status === 200){
      let data = await resp.json();
      if (data !== null){
        if (data.value.email === email){
          return [true, data.value.balance]
        }
        else {return [false, null];}
      }
    }
    else { return false; }
  }
  
}

function Deposit() {

  const context = useContext(UserContext);

  // Display special HTML if they are not logged in
  if (context.loggedInUser === null) {
    return (
      <div className='content'>
        <h2>Deposit</h2>
        <div>
          You are not logged in.
        </div>
      </div>
    );
  }

  // Get the logged in user
  let balance = context.balance;
  let email = context.email;

  // Set up formik
  const formikProps = {
    initialValues: {
      amount: 0
    },
    validate: async values => {
      const errors = {};
      const depositComplete = await deposit(
        email, 
        Number(values.amount),
        context)

      if (!depositComplete[0]){
        errors.deposit = 'Unable to deposit';
      }
      else {
        balance = depositComplete[1]
        context.balance = balance;
        
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      
      resetForm();
      alert('Amount deposited!');
    }
  };

  // Render the content
  return (
    <div className='content'>
      <h2>Deposit</h2>
      <div>
        Your balance is: ${balance}.
      </div>

      <Formik {...formikProps}>
        <Form>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <Field type='number' className='form-control' id='amount' name='amount' placeholder='acrist' />
            <ErrorMessage className='error' name='amount' component='div' />
          </div>

          <br/>
          <button type='submit' className='btn btn-primary' onClick={onDeposit}>Deposit</button>
        </Form>

      </Formik>

    </div>
  );
}

export default Deposit;