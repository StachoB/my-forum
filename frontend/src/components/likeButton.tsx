import { useState } from "react";
import {
  useGetIsPubliLikedQuery,
  usePostLikeMutation,
} from "src/store/rtk/likes";

function LikeButton(props: { publi_id: string }) {
  const [postLike] = usePostLikeMutation();

  const { data: isLiked } = useGetIsPubliLikedQuery({
    publiId: props.publi_id,
  });

  async function AddLike() {
    await postLike({ post: props.publi_id });
  }

  return (
    <button
      className={`btn ${isLiked ? "liked" : "notLiked"}`}
      onClick={AddLike}
    >
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
