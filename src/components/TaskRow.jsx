import { memo } from "react";

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
      <td>{tasks.title}</td>
      <td className={classNameStatus}>{tasks.status}</td>
      <td>{tasks.createdAt}</td>
    </tr>
  );
});

export default TaskRow;
