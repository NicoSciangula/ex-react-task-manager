import { createPortal } from "react-dom";

export default function Modal({ title, content, show = false, onClose, onConfirm }) {
  if (!show) return null;

  return (
    show &&
    createPortal(
      <div className="modal-container">
        <div className="my-modal">
          <h2>{title}</h2>
          <p>{content}</p>
          <div className="d-flex justify-content-between btn-container">
            <button className="btn btn-success" onClick={onConfirm}>
              Conferma
            </button>
            <button className="btn btn-danger" onClick={onClose}>
              Annulla
            </button>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}
