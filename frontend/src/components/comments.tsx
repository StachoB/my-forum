import React from "react";
import store from "src/store";
import { useGetUserByIdQuery } from "src/store/rtk/user";
import { CommentType } from "src/types/commentType";
import SuppressCom from "./supressComment";

const Comm: React.FC<CommentType> = ({ _id, text, date, user }) => {
  const { data: res } = useGetUserByIdQuery({ userId: user });
  const newDate = new Date(date);
  return (
    <div className="containerComment">
      <div className="lighterText">From : {res}</div>
      <div className="lighterText">Posted on : {newDate.toDateString()}</div>
      <div className="postcomContent">{text}</div>
      {store.getState().user.access_token !== "" ? (
        <div>
          <SuppressCom comId={_id} userId={user} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comm;
