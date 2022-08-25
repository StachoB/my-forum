import {
  useGetLastWeekLikesQuery,
  useGetTotalLikesQuery,
} from "src/store/rtk/likes";
import {
  useGetNumberPubliUserLastWeekQuery,
  useGetNumberPubliUserQuery,
} from "src/store/rtk/publications";
import NavBar from "./navBar";
import PieChart from "./pieChart";

function Analytics() {
  const { data: nbPubli } = useGetNumberPubliUserQuery();
  const { data: totalLikes } = useGetTotalLikesQuery();
  const { data: nbPubliLastWeek } = useGetNumberPubliUserLastWeekQuery();
  const { data: totalLikesLastWeek } = useGetLastWeekLikesQuery();
  return (
    <div className="analytics">
      <NavBar />
      <div>
        Number of published posts : <div className="userData">{nbPubli}</div>
      </div>
      <div>
        Total of likes generated : <div className="userData">{totalLikes}</div>
      </div>
      <div>
        Number of post published less than a week ago :
        <div className="userData">{nbPubliLastWeek}</div>
      </div>
      <div>
        Total of likes generated less than a week ago :
        <div className="userData">{totalLikesLastWeek}</div>
      </div>
      <div>
        <PieChart />
      </div>
    </div>
  );
}

export default Analytics;
