import React from "react";
import { useGetUserByIdQuery } from "src/store/rtk/user";
import { PubliType } from "src/types/publiType";

const Publi: React.FC<PubliType> = ({id, title, text, date, user}) =>{
const {data:res} = useGetUserByIdQuery({userId : user})
const newDate = new Date(date);
return (<div >
    
    <div className="title">{title}</div>
    <div className="lighterText">From : {res}</div>
    <div className="lighterText">Posted on : {newDate.toDateString()}</div>
    <div className="postcomContent">{text}</div>
</div>)
}

export default Publi;
