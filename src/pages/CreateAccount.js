import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

var clicked = false;

/**
 * Ensure that we don't deposit pre-maturely
 */
function onCreate(){
  clicked = true;
}

async function createNewAccount(name, email, password) {
  if (!clicked){
    return [false, null];
  }
  else {
    clicked = false;
    let resp = await fetch(`https://bad-bank-api.herokuapp.com/account/create/${name}/${email}/${password}`);
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
  

}

class CreateAccount extends React.Component {

  constructor(props) {
    super(props)
    this.formikProps = {
      initialValues: {
        name: '',
        email: '',
        password: ''
      },
      validate: async values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        else if (!values.email) {
          errors.email = 'Required';
        }
        else if (!values.password) {
          errors.password = 'Required';
        }
        else {
          // let us attempt to create this sucker
          const accountCreated = await createNewAccount(
            values.name,
            values.email,
            values.password
          )
        }
        

        


        return errors;

      },
      onSubmit: (values, { resetForm }) => {
        resetForm();
        alert(`Welcome ${values.name}\nYour email account is: ${values.email}`);
      }
    };
  }
  render() {
    return (
      <div className='content'>
        <h2>Create Account</h2>
        
        <Formik {...this.formikProps}>
          <Form>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <Field className='form-control' id='name' name='name' placeholder='John Doe' />
              <ErrorMessage className='error' name='name' component='div' />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Field className='form-control' id='email' name='email' placeholder='john.doe@email.com' />
              <ErrorMessage className='error' name='email' component='div' />
            </div>
  
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field className='form-control' id='password' name='password' placeholder='****' type='password' />
              <ErrorMessage className='error' name='password' component='div' />
            </div>
            
            <br/>
            <button type='submit' className='btn btn-primary' onClick={onCreate}>Create</button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default CreateAccount;