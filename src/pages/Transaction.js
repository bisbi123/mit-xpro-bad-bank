import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';


var clicked = false;

/**
 * Ensure that we don't deposit pre-maturely
 */
function onTransaction(){
  clicked = true;
}

async function transaction(email, amount) {
  if (!clicked){
    return [false, null];
  }
  else{
    clicked = false;
    let resp = await fetch(`https://bad-bank-api.herokuapp.com/account/update/${email}/${amount}`);
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


class Transaction extends React.Component {

  constructor(props){
    super(props)
    // Display special HTML if they are not logged in
    

    // Get the logged in user
    this.balance = this.props.ctx.balance;
    this.email = this.props.ctx.email;

    // Set up formik
    this.formikProps = {
      initialValues: {
        amount: 0,
        balance: null
      },
      validate: async values => {
        const errors = {};
        const transactionComplete = await transaction(
          this.email, 
          Number(values.amount)
          )

        if (!transactionComplete[0]){
          errors.transaction = 'Unable to complete transaction';
        }
        else {
          values.balance = transactionComplete[1]
          
          
        }
        return errors;
      },
      onSubmit: (values, { resetForm }) => {
        
        resetForm();
        alert('Amount deposited!');
        this.props.updateBalance(values.balance);
        this.render();
      }
    };

  }

  render () {
    if (this.props.ctx.loggedInUser === null) {
      return (
        <div className='content'>
          <h2>Transaction</h2>
          <div>
            You are not logged in.
          </div>
        </div>
      );
    }
    return (
      <div className='content'>
        <h2>Transaction</h2>
        <div>
          Your balance is: ${this.props.ctx.balance}.
        </div>
  
        <Formik {...this.formikProps}>
          <Form>
            <div className='form-group'>
              <label htmlFor='amount'>Amount</label>
              <Field type='number' className='form-control' id='amount' name='amount' placeholder='acrist' />
              <ErrorMessage className='error' name='amount' component='div' />
            </div>
  
            <br/>
            <button type='submit' className='btn btn-primary' onClick={onTransaction}>Submit</button>
          </Form>
  
        </Formik>
  
      </div>
    );
  }
}

export default Transaction;