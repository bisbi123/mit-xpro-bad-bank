import { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import UserContext from '../UserContext.js';

function checkLogin(username, password, users) {
  for (const user of users) {
    if (
      user.username === username &&
      user.password === password
    ) {
      return true;
    }
  }
  return false;
}

function Login() {

  const context = useContext(UserContext);

  const formikProps = {
    initialValues: {
      username: '',
      password: ''
    },
    validate: values => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      const isLoginValid = checkLogin(
        values.username,
        values.password,
        context.users
      );
      if (!isLoginValid) {
        errors.login = 'Invalid login';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      context.loggedInUser = values.username;
      resetForm();
      alert(`Welcome back, ${values.username}!`);
    }
  };

  return (
    <div className='content'>
      <h2>Login</h2>

      <Formik {...formikProps}>
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

export default Login;