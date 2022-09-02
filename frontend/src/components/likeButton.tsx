import {
  useGetIsPubliLikedQuery,
  useGetNumberLikesPubliQuery,
  usePostLikeMutation,
} from "src/store/rtk/likes";

function LikeButton(props: { publi_id: string }) {
  const [postLike] = usePostLikeMutation();
  const { data: nbLikes } = useGetNumberLikesPubliQuery({
    publiId: props.publi_id,
  });
  const { data: isLiked } = useGetIsPubliLikedQuery({
    publiId: props.publi_id,
  });

  async function AddLike() {
    await postLike({ post: props.publi_id });
  }

  return (
    <div className="likes">
      {nbLikes} Likes
      <button
        className={`btn ${isLiked ? "liked" : "notLiked"} likeBtn`}
        onClick={AddLike}
      >
        {isLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
}

export default LikeButton;
