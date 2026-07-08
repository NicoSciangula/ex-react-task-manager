import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useMemo, useState } from "react";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const arrowIcon = sortOrder === 1 ? "▲" : "▼";

  const handleSortBy = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedTask = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let compare;
      if (sortBy === "title") {
        compare = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const status = ["To do", "Doing", "Done"];
        compare = status.indexOf(a.status) - status.indexOf(b.status);
      } else if (sortBy === "createdAt") {
        compare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return compare * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <>
      <main className="d-flex flex-column align-items-center">
        <div className="mt-3 table-responsive border rounded overflow-hidden container-table-task">
          <table className="table table-light table-hover text-center mb-0">
            <thead className="thead-bg">
              <tr>
                <th scope="col">#</th>
                <th scope="col" onClick={() => handleSortBy("title")}>
                  Titolo {sortBy === "title" && arrowIcon}
                </th>
                <th scope="col" onClick={() => handleSortBy("status")}>
                  Status {sortBy === "status" && arrowIcon}
                </th>
                <th scope="col" onClick={() => handleSortBy("createdAt")}>
                  Data Creazione {sortBy === "createdAt" && arrowIcon}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTask.map((t) => (
                <TaskRow key={t.id} tasks={t} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
