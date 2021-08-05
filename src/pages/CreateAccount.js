import { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import UserContext from '../UserContext.js';

function CreateAccount() {

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
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      context.users.push({
        username: values.username,
        password: values.password,
        balance: 0
      });
      resetForm();
      alert(`Account created with username: ${values.username}`);
    }
  };

  return (
    <div className='content'>
      <h2>Create Account</h2>
      
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
          <button type='submit' className='btn btn-primary'>Create</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateAccount;