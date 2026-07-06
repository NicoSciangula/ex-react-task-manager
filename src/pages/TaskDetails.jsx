import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";

export default function TaskDetails() {
  const { tasks, deleteTask } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const singleTask = tasks.find((task) => {
    return task.id === parseInt(id);
  });

  const handleDelete = async () => {
    try {
      await deleteTask(parseInt(id));
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
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
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={() => setIsOpenModal(!isOpenModal)}>
              Elimina task
            </button>
            <button onClick={() => navigate("/")} className="btn btn-secondary">
              Indietro
            </button>
          </div>
          <Modal
            title="Elimina Task"
            content="Sei sicuro di voler procedere?"
            show={isOpenModal}
            onClose={() => setIsOpenModal(!isOpenModal)}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
