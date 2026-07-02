import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log(tasks);
  return (
    <>
      <main className="d-flex flex-column align-items-center">
        <div className="mt-3 table-responsive border rounded overflow-hidden container-table-task">
          <table className="table table-light table-hover text-center mb-0">
            <thead className="thead-bg">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titolo</th>
                <th scope="col">Status</th>
                <th scope="col">Data Creazione</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <TaskRow key={t.id} tasks={t} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
