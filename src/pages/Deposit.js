import { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import UserContext from '../UserContext.js';

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
  let user;
  for (const eachUser of context.users) {
    if (eachUser.username === context.loggedInUser) {
      user = eachUser;
    }
  }

  // Set up formik
  const formikProps = {
    initialValues: {
      amount: 0
    },
    onSubmit: (values, { resetForm }) => {

      // Update our user's balance
      for (let i = 0; i < context.users.length; i++) {
        const eachUser = context.users[i];
        if (eachUser.username === context.loggedInUser) {
          context.users[i].balance += Number(values.amount);
        }
      }

      resetForm();
      alert('Amount deposited!');
    }
  };

  // Render the content
  return (
    <div className='content'>
      <h2>Deposit</h2>
      <div>
        Your balance is: ${user.balance}.
      </div>

      <Formik {...formikProps}>
        <Form>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <Field type='number' className='form-control' id='amount' name='amount' placeholder='acrist' />
            <ErrorMessage className='error' name='amount' component='div' />
          </div>

          <br/>
          <button type='submit' className='btn btn-primary'>Deposit</button>
        </Form>

      </Formik>

    </div>
  );
}

export default Deposit;