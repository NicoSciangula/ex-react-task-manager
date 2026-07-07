import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ task, show, onClose, onSave }) {
  const [editTask, setEditTask] = useState(task);

  const { title, description, status } = editTask;

  const formRef = useRef();

  const modifyEditTask = (k, e) => {
    setEditTask((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editTask);
  };

  return (
    <Modal
      title="Modifica task"
      confirmText="Salva"
      content={
        <div className="form-container">
          <form className="d-flex flex-column" ref={formRef} onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <label>Titolo</label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => modifyEditTask("title", e)}
              />
              {/*taskTitleError && (
                <p className="mt-1" style={{ color: "red" }}>
                  {taskTitleError}
                </p>
              )*/}

              <label>Descrizione</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => modifyEditTask("description", e)}
              ></textarea>

              <label>Status</label>
              <select
                className="mt-3 form-select"
                value={status}
                onChange={(e) => modifyEditTask("status", e)}
              >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </form>
        </div>
      }
      show={show}
      onClose={onClose}
      onConfirm={() => formRef.current.requestSubmit()}
    />
  );
}
