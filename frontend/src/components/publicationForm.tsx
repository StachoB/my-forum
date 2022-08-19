import history from "../lib/history";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {usePostPubliMutation } from 'src/store/rtk/publications';
import NavBar from "./navBar";
import { useGetUserIdMutation } from "src/store/rtk/user";

const validationSchema = Yup.object().shape({
  title: Yup.string()
      .required("A publication cannot have an empty title..."),
  text: Yup.string()
      .required("A publication cannot have an empty content..."),
});

const initialValues = {
  title: "",
  text: "",
};

const PublicationForm = () => {

    function GoToHome() {
        history.push("/");
    }

    const [postPubli, {data}] = usePostPubliMutation()
    const [getProfile, data2] = useGetUserIdMutation()

  return (
      <div className="publicationForm">
        <NavBar />
          <div className="row">
              <div className="mx-auto" >
                  <h1 className="text-center">Write a post to reach friends on My Forum !</h1>
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={async (values, actions) =>{
                        const res2 = await getProfile({});
                        if ('data' in res2){
                        const res = await postPubli({title :values.title, text: values.text, user: res2.data.userId});
                        }
                        history.push("/");
                      }}
                  >
                      {({ resetForm }) => (
                          <Form>
                              <div className="form-group mb-3">
                                  <label htmlFor="title">
                                  </label>
                                  <Field
                                      type="text"
                                      id="title"
                                      name="title"
                                      className="form-control"
                                      placeholder="Title of your post"
                                  />
                                  <ErrorMessage
                                      name="title"
                                      component="small"
                                      className="text-danger"
                                  />
                              </div>
                              <div className="form-group mb-3">
                                  <label htmlFor="text">
                                  </label>
                                  <Field
                                      type="text"
                                      id="text"
                                      name="text"
                                      className="form-control textBox"
                                      placeholder="Write here the content of your post"
                                  />
                                  <ErrorMessage
                                      name="text"
                                      component="small"
                                      className="text-danger"
                                  />
                              </div>
                              <div className="form-group btnGroup">
                                  <button
                                      type="submit"
                                      className="btn btn-success"
                                  >
                                      Publish
                                  </button>
                                  <button
                                      className="btn btn-outline-danger"
                                      onClick={GoToHome}
                                  >
                                      Cancel
                                  </button>
                              </div>
                          </Form>
                      )}
                  </Formik>
              </div>
          </div>
      </div>
  );
};

export default PublicationForm;

