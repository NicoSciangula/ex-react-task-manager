import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";
import { useCallback, useContext, useMemo, useState } from "react";

//* Funzione di debounds
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [search, setSearch] = useState("");

  const arrowIcon = sortOrder === 1 ? "▲" : "▼";

  const debounceSearch = useCallback(debounce(setSearch, 500), []);

  //* Ordinamento delle task
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

  //* Filtraggio task
  const filteredTask = useMemo(() => {
    if (search === "") return sortedTask;
    return sortedTask.filter((t) => {
      return t.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, sortedTask]);

  return (
    <>
      <main className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center align-items-center mt-3">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Cerca task..."
            onChange={(e) => debounceSearch(e.target.value)}
          />
          <i className="bi bi-search fs-4 text-secondary"></i>
        </div>
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
              {filteredTask.map((t) => (
                <TaskRow key={t.id} tasks={t} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
