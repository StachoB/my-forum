import React from 'react';
import history from "../lib/history";
import {useGetAllPubliQuery} from 'src/store/rtk/publications';
import GetComment from './getcomments';
import NavBar from './navBar';
import Publi from './publications';
import SuppressPubli from './suppressPubli';

function Home() {

 function GoToPostPubli() {
  history.push("/postPubli");
}

const GoToPostComment = (publiId : string) => {
  history.push(`postComment/${publiId}`);
};

  const {data} = useGetAllPubliQuery({})
 return (
  <div className='getPosts'>
    <NavBar />
    <h1>Welcome to My Forum !</h1>
    {localStorage.getItem("access_token") === null && 
    <div>
      <p>Log in or create an account to be able to write and comment publications on My Forum.</p>
    </div>
    }
    {localStorage.getItem("access_token") !== null && 
    <div>
      <button type="button" className="btn btn-success" onClick={GoToPostPubli}>Write a post</button>
    </div>
    }
    <div>

        {data?.map((publication: { _id: string; title:string; text:string; date:string; user:string}) =>{
          return <div className="containerPost" key = {publication._id}>
            <Publi id={publication._id} title={publication.title} text={publication.text} date={publication.date} user={publication.user} />
            <GetComment _id={publication._id} />
            {localStorage.getItem("access_token") !== null && 
            <div>
              <button type="button" className="btn btn-success" onClick={event => GoToPostComment(publication._id)}>Comment</button>
              < SuppressPubli publiId={publication._id} userId={publication.user}  /> 
            </div>
            }
        </div>
        })}
      
    </div>
     
  
  </div>
)
    
}

export default Home;

