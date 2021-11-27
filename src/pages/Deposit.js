import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';


var clicked = false;

/**
 * Ensure that we don't deposit pre-maturely
 */
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


class Deposit extends React.Component {

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
        const depositComplete = await deposit(
          this.email, 
          Number(values.amount)
          )

        if (!depositComplete[0]){
          errors.deposit = 'Unable to deposit';
        }
        else {
          values.balance = depositComplete[1]
          
          
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
          <h2>Deposit</h2>
          <div>
            You are not logged in.
          </div>
        </div>
      );
    }
    return (
      <div className='content'>
        <h2>Deposit</h2>
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
            <button type='submit' className='btn btn-primary' onClick={onDeposit}>Deposit</button>
          </Form>
  
        </Formik>
  
      </div>
    );
  }
}

export default Deposit;