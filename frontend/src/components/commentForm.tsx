import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostComMutation } from "src/store/rtk/comments";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("A comment cannot have an empty content..."),
});

const initialValues = {
  text: "",
};

function CommentForm(props: { publiId: string }) {
  const [postCom] = usePostComMutation();
  return (
    <div className="commentForm">
      <div className="row">
        <div className="mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const res = await postCom({
                text: values.text,
                post: props.publiId,
              });
              resetForm();
            }}
          >
            {() => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="text"></label>
                  <Field
                    type="text"
                    id="text"
                    name="text"
                    className="form-control textBoxComment"
                    placeholder="Write here a comment about this post"
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
}

export default CommentForm;
