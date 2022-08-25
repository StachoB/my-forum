import Publi from "./publications";
import GetComment from "./getcomments";
import CommentForm from "./commentForm";
import SuppressPubli from "./suppressPubli";
import { useAppSelector } from "src/store";
import LikeButton from "./likeButton";
import { PubliType } from "src/types/publiType";

function ListPublications(props: { data: PubliType[] }) {
  const access_token = useAppSelector((state) => state.user.access_token);
  return (
    <div>
      {props.data.map((publication: PubliType) => {
        return (
          <div className="containerPost" key={publication._id}>
            <Publi
              _id={publication._id}
              title={publication.title}
              text={publication.text}
              date={publication.date}
              user={publication.user}
            />
            <GetComment _id={publication._id} />
            {access_token !== "" ? (
              <div>
                <CommentForm publiId={publication._id} />
                <SuppressPubli
                  publiId={publication._id}
                  userId={publication.user}
                />
                <LikeButton publi_id={publication._id} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ListPublications;
