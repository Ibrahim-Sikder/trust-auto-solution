import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight, HiOutlineEye } from "react-icons/hi";
import { useGetAllJobCardsQuery } from "../../../redux/api/jobCard";

const BorderLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      color || (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
  },
}));

const RecentProject = () => {
  const { data, error, isLoading } = useGetAllJobCardsQuery({
    limit: 10,
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="recentCard overflow-x-auto">
        <div className="flex items-center justify-between">
          <h3 className="m-3 text-xl block font-semibold">Recent Projects</h3>
          <Link to="/dashboard/quotaiton-list">
            <button className="flex items-center mr-2 rounded-full px-3 py-1 bg-[#DDDDDD]">
              <small>See More</small>
              <HiOutlineArrowNarrowRight size={15} className="ml-1" />
            </button>
          </Link>
        </div>

        <hr />
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Job No</th>
              <th>Date</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.jobCards?.map((job, i) => (
              <tr key={i}>
                <td>{job.Id}</td>
                <td>
                  <div>
                    <h4>{job.job_no}</h4>
                    <div className="flex items-center">
                      <small className="block mr-3 text-[#8E8E8E]">
                        2 Open tasks,{" "}
                      </small>
                      <small className="text-[#60BE6B]">
                        10 tasks completed
                      </small>
                    </div>
                  </div>
                </td>
                <td>{job.date}</td>
                <td>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress
                      stroke="#60BE6B"
                      variant="determinate"
                      value={job.progress || 80} // Replace with actual progress value if available
                    />
                  </Stack>
                </td>

                <td>
                  <div className="flex items-center justify-center mr-8">
                    <HiOutlineEye size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentProject;
