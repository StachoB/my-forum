import history from "../lib/history";
import store from "src/store";
import { useGetProfileQuery } from "src/store/rtk/user";
import { clearState} from "src/store/slices/user";
import NavBar from "./navBar";


function Account() {

    function SignOut() {
      store.dispatch(clearState());
      history.push("/");
    }

    const {data} = useGetProfileQuery({});
    console.log(data?.userId)
 return (
  <div className="account">
    <NavBar />
    <div className="connexionInfos m-2">
         You are now connected as : <p className="fw-bold"> {data?.username}</p> 
    </div>
    <div className="m-2">You can sign out from this account to use another one</div>
    <button className="btn btn-outline-danger" onClick={SignOut}>Sign out</button>
  </div>
)
    
}

export default Account;