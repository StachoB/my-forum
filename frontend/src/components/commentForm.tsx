import {Formik, Field, Form, ErrorMessage} from 'formik';
import history from "../lib/history";
import * as Yup from 'yup';
import { usePostComMutation } from 'src/store/rtk/comments';
import { useGetUserIdMutation } from 'src/store/rtk/user';
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import { useGetOnePubliQuery } from 'src/store/rtk/publications';
import Publi from './publications';

const validationSchema = Yup.object().shape({
  text: Yup.string()
      .required("A comment cannot have an empty content..."),
});

const initialValues = {
  text: "",
};

const CommentForm = () => {

    function GoToHome() {
        history.push("/");
    }
    
    const [postCom, {data}] = usePostComMutation()
    const [getProfile, data2] = useGetUserIdMutation()
    const {publiId} = useParams()
    let publiIdFinal = "";
    if (typeof publiId == 'string'){
        publiIdFinal = publiId;
    }
    const {data:publi} = useGetOnePubliQuery({publiId : publiIdFinal})
  return (
      <div className="commentForm">

        <NavBar />
        <div className='containerPost'>
        {publi && <div> <Publi id={publi?._id} title={publi?.title} text={publi?.text} date={publi?.date} user={publi?.user} /></div>}
          <div className="row">
              <div className="mx-auto" >
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={async (values,{resetForm}) =>{
                        const res2 = await getProfile({});
                        if ('data' in res2){
                            if (typeof publiId == 'string'){
                            const res = await postCom({text :values.text, user : res2.data.userId, post : publiId});   
                            }
                            history.push("/");
                        }
                      }}
                  >
                      {({ resetForm }) => (
                          <Form>
                              <div className="form-group mb-3">
                                  <label htmlFor="text">
                                  </label>
                                  <Field
                                      type="text"
                                      id="text"
                                      name="text"
                                      className="form-control textBox"
                                      placeholder="Write here the content of your comment about this post"
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
      </div>
  );
};    

export default CommentForm;