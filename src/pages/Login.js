import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';


async function checkLogin(email, password) {
  
  let resp = await fetch(`https://bad-bank-api.herokuapp.com/account/login/${email}/${password}`);
  if (resp.status === 200){
    let data = await resp.json();
    if (data !== null){
      if (data.email === email & data.password === password){
        return [true, data];
      }
      else {return [false, null];}
    }
  }

}

class Login extends React.Component {
  constructor(props){
    super(props)
    this.formikProps = {
      initialValues: {
        username: '',
        password: ''
      },
      validate: async values => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        const isLoginValid = await checkLogin(
          values.username,
          values.password);
        if ( isLoginValid !== undefined){
          if (isLoginValid[1] !== undefined){
            values.data = isLoginValid[1];
          }
          
        }
        if (!isLoginValid) {
          errors.login = 'Invalid login';
        }
        
        console.log(isLoginValid)
        return errors;
      },
      onSubmit: (values, { resetForm }) => {
        
        this.props.ctx.loggedInUser = values.data.name;
        this.props.ctx.balance = values.data.balance;
        this.props.ctx.email = values.data.email;
        resetForm();
        alert(`Welcome back, ${values.username}!`);
        this.props.login();
        
      }
    };
  }
  
  render() {

    return (
      <div className='content'>
        <h2>Login</h2>
  
        <Formik {...this.formikProps}>
          <Form>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <Field className='form-control' id='username' name='username' placeholder='acrist' />
              <ErrorMessage className='error' name='username' component='div' />
            </div>
  
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field className='form-control' id='password' name='password' placeholder='****' type='password' />
              <ErrorMessage className='error' name='password' component='div' />
            </div>
  
            <br/>
            <button type='submit' className='btn btn-primary'>Login</button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Login;