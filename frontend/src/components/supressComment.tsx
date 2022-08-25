import { useDeleteComMutation } from "src/store/rtk/comments";
import { useGetProfileQuery } from "src/store/rtk/user";

function SuppressCom(props: { comId: string; userId: string }) {
  const [deleteCom] = useDeleteComMutation();
  function DeletePost() {
    const res = deleteCom({ comId: props.comId });
  }

  const { data } = useGetProfileQuery({});
  return (
    <div className="suppressComment">
      {data?.userId === props.userId && (
        <div>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={DeletePost}
          >
            Suppress my comment
          </button>
        </div>
      )}
    </div>
  );
}

export default SuppressCom;
