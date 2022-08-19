import React from "react";
import { useGetUserByIdQuery } from "src/store/rtk/user";
import { CommentType } from "src/types/commentType";
import SuppressCom from "./supressComment";

const Comm: React.FC<CommentType> = ({id, text, date, user, post}) => {
  const {data:res} = useGetUserByIdQuery({userId : user})
  const newDate = new Date(date);
  return (<div className="containerComment">
    <div className="lighterText">From : {res}</div>   
    <div className="lighterText">Posted on : {newDate.toDateString()}</div>
    <div className="postcomContent">{text}</div>
    {localStorage.getItem("access_token") !== null && 
      <div>
        <SuppressCom comId={id} userId={user}/>
      </div>}
    </div>)
}
    
export default Comm;