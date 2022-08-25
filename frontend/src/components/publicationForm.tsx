import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostPubliMutation } from "src/store/rtk/publications";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("A publication cannot have an empty title..."),
  text: Yup.string().required("A publication cannot have an empty content..."),
});

const initialValues = {
  title: "",
  text: "",
};

const PublicationForm = () => {
  const [postPubli] = usePostPubliMutation();

  return (
    <div className="publicationForm">
      <div className="row">
        <div className="mx-auto">
          <h2 className="text-center">
            Write a post to reach friends on My Forum !
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await postPubli({
                title: values.title,
                text: values.text,
              });
              resetForm();
            }}
          >
            {() => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="title"></label>
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
                  <label htmlFor="text"></label>
                  <Field
                    type="text"
                    id="text"
                    name="text"
                    className="form-control textBoxPost"
                    placeholder="Write here the content of your post"
                  />
                  <ErrorMessage
                    name="text"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group btnGroup">
                  <button type="submit" className="btn btn-success">
                    Publish
                  </button>
                  <button type="reset" className="btn btn-outline-danger">
                    Reset
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
