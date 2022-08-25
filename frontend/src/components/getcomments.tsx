import { useGetComPubliQuery } from "src/store/rtk/comments";
import ListComments from "./listComment";
import Loader from "react-ts-loaders";

function GetComments(props: { _id: string }) {
  const { data } = useGetComPubliQuery({ publiId: props._id });
  return (
    <div>
      {data ? (
        <ListComments data={data} />
      ) : (
        <Loader type="spinner" color="green" />
      )}
    </div>
  );
}

export default GetComments;
