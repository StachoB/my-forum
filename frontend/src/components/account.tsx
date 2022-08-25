import store, { useAppDispatch } from "src/store";
import { useGetProfileQuery } from "src/store/rtk/user";
import { clearState } from "src/store/slices/user";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  async function SignOut() {
    store.dispatch(clearState());
    window.location.reload();
    navigate("/");
  }

  const { data } = useGetProfileQuery({});
  return (
    <div className="account">
      <NavBar />
      <div className="connexionInfos m-2">
        You are now connected as : <p className="fw-bold"> {data?.username}</p>
      </div>
      <div className="m-2">
        You can sign out from this account to use another one
      </div>
      <button className="btn btn-outline-danger" onClick={SignOut}>
        Sign out
      </button>
    </div>
  );
}

export default Account;
