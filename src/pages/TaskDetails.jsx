import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { tasks } = useContext(GlobalContext);
  const { id } = useParams();

  const singleTask = tasks.find((task) => {
    return task.id === parseInt(id);
  });

  const handleDelete = () => {
    alert("Task eliminata");
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-3">
        <h1>Pagina di dettaglio Task</h1>
        <div className="details-container mt-3">
          <div>
            <p>
              <b>Titolo:</b> {singleTask.title}
            </p>
            <p>
              <b>Descrizione:</b> {singleTask.description}
            </p>
            <p>
              <b>Status:</b> {singleTask.status}
            </p>
            <p>
              <b>Data creazione:</b> {new Date(singleTask.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button className="btn btn-danger" onClick={handleDelete}>
            Elimina task
          </button>
        </div>
      </div>
    </>
  );
}
