import { CommentType } from "src/types/commentType";
import Comm from "./comments";

function ListComments(props: { data: CommentType[] }) {
  return (
    <div>
      {props.data.map((comment: CommentType) => {
        return (
          <div key={comment._id}>
            <Comm
              _id={comment._id}
              text={comment.text}
              date={comment.date}
              user={comment.user}
              post={comment.post}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListComments;
