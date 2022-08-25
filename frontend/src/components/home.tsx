import { useGetAllPubliQuery } from "src/store/rtk/publications";
import NavBar from "./navBar";
import PublicationForm from "./publicationForm";
import ListPublications from "./listPublication";
import Loader from "react-ts-loaders/dist";
import { useAppSelector } from "src/store";

function Home() {
  const { data } = useGetAllPubliQuery({});
  const access_token = useAppSelector((state) => state.user.access_token);
  return (
    <div className="Home">
      <NavBar />
      <h1>Welcome to My Forum !</h1>
      {access_token === "" ? (
        <div>
          <p>
            Log in or create an account to be able to write and comment
            publications on My Forum.
          </p>
        </div>
      ) : (
        <div>
          <PublicationForm />
        </div>
      )}
      <div>
        {data ? (
          <ListPublications data={data} />
        ) : (
          <Loader type="spinner" color="green" />
        )}
      </div>
    </div>
  );
}

export default Home;
