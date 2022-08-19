import React from 'react';
import history from "../lib/history";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useGetUserMutation} from 'src/store/rtk/user';
import { useNavigate } from 'react-router-dom';
import {loginUser} from 'src/store/slices/user';
import store from 'src/store';
import NavBar from './navBar';
import { findAncestor } from 'typescript';

const validationSchema = Yup.object().shape({
  username: Yup.string()
      .max(20, "No username can be this long...")
      .required("This field is required"),
  password: Yup.string()
      .required("This field is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const handleSubmit = (values: { username: string; password: string;}) => {
  console.log(values)
};

const LoginForm = () => {

  const navigate = useNavigate();

  const navigateToSignup = () =>{
    navigate('/signup');
  }

  const [getUser, {data}] = useGetUserMutation()
  const [ isAlertVisible, setIsAlertVisible ] = React.useState(false)

  return (
      <div className="logInForm">
        <NavBar />
          <div className="row">
              <div className="col-md-6 offset-md-3 pt-3">
                  <h1 className="text-center">Log in to an existing account </h1>
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={async (values, actions) =>{
                        const data = await getUser({username : values.username, password : values.password});
                        if ('error' in data){
                          setIsAlertVisible(true);
                          setTimeout(() => {
                          setIsAlertVisible(false);
                        }, 5000);
                        }
                        else{
                            const res = await store.dispatch(loginUser({username : values.username, password : values.password}));
                           history.push('/')
                        }
                      }}
                  >
                      {({ resetForm }) => (
                          <Form>
                              <div className="form-group mb-3">
                                  <label htmlFor="username">
                                      Username
                                  </label>
                                  <Field
                                      type="text"
                                      id="username"
                                      name="username"
                                      className="form-control"
                                  />
                                  <ErrorMessage
                                      name="username"
                                      component="small"
                                      className="text-danger"
                                  />
                              </div>
                              <div className="form-group mb-3">
                                  <label htmlFor="password">
                                      Password
                                  </label>
                                  <Field
                                      type="password"
                                      id="password"
                                      name="password"
                                      className="form-control"
                                  />
                                  <ErrorMessage
                                      name="password"
                                      component="small"
                                      className="text-danger"
                                  />
                              </div>
                              <div className="form-group mb-3">
                                  <button
                                      type="submit"
                                      className="btn btn-success"
                                  >
                                      Log in
                                  </button>
                                  
                              </div>
                          </Form>
                      )}
                  </Formik>

              </div>
          </div>

          {isAlertVisible && <div className='alert-container'>
               <div className='alert-inner alert-failed'>Your username or password is incorrect, please try again.</div>
          </div>}

          <div className='lighterText'>You don't have an account yet ? Sign up <a href='#' onClick={navigateToSignup}>here.</a></div>

          <div></div>
      </div>
  );
};    

export default LoginForm;



