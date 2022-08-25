import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostUserMutation } from "src/store/rtk/user";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(20, "No username can be this longer than 20 characters...")
    .required("This field is required"),
  password: Yup.string()
    .min(7, "The password should have at least 7 characters")
    .required("This field is required"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf(
      [Yup.ref("password"), null],
      "The confirmation password does not correspond to the password"
    ),
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const [isAccountCreated, setIsAccountCreated] = React.useState(true);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [postUser] = usePostUserMutation();

  return (
    <div className="signUpForm">
      <NavBar />
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">
            Sign up if you don't already have an account !
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const res = await postUser({
                username: values.username,
                password: values.password,
              });
              if ("error" in res) {
                setIsAccountCreated(false);
              } else {
                resetForm();
              }
              setIsAlertVisible(true);
              setTimeout(() => {
                setIsAccountCreated(true);
                setIsAlertVisible(false);
              }, 5000);
            }}
          >
            {() => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
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
                  <label htmlFor="password">Password</label>
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
                  <label htmlFor="confirmPassword">Confirm the password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-success">
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {isAlertVisible && (
        <div className="alert-container">
          {isAccountCreated && (
            <div className="alert-inner alert-success">
              Your account was created, please login to be able to use My Forum.
            </div>
          )}
          {!isAccountCreated && (
            <div className="alert-inner alert-failed">
              This username is already taken by an existing account. Please
              choose another one.
            </div>
          )}
        </div>
      )}

      <div className="lighterText">
        You already have an account ? Log in{" "}
        <a href="#" onClick={navigateToLogin}>
          here.
        </a>
      </div>
    </div>
  );
};

export default SignUpForm;
