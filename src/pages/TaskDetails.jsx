import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Task Details</h2>
      <p>Task ID: {id}</p>
      <p>More details coming soon...</p>
    </div>
  );
};

export default TaskDetails;