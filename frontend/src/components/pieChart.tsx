import { Chart } from "react-google-charts";
import Loader from "react-ts-loaders/dist";
import { useGetAllUsersNbPubliQuery } from "src/store/rtk/publications";

function PieChart() {
  const { data: usersData } = useGetAllUsersNbPubliQuery();
  let data: (string | number)[][] = [];
  data.push(["User", "Number of posts published"]);
  usersData?.map(async (userPubli) => {
    data.push([userPubli._id, userPubli.total_posts]);
  });

  const options = {
    title:
      "Contribution of each users (depending on number of posts published)",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="pieChart">
      {usersData ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        <Loader type="spinner" color="green" />
      )}
    </div>
  );
}

export default PieChart;
