import { memo } from "react";
import { Link } from "react-router-dom";

const STATUS_CLASSES = {
  "To do": "table-warning",
  Doing: "table-primary",
  Done: "table-success",
};

const TaskRow = memo(({ tasks }) => {
  const classNameStatus = STATUS_CLASSES[tasks.status];

  return (
    <tr>
      <th scope="row">{tasks.id}</th>
      <td>
        <Link to={`/task/${tasks.id}`}>{tasks.title}</Link>
      </td>
      <td className={classNameStatus}>{tasks.status}</td>
      <td>{new Date(tasks.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
