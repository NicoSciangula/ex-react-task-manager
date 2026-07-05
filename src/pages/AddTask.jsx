import { useRef, useState } from "react";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
  const [inputData, setInputData] = useState("");
  const textAreaRef = useRef();
  const selectRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData.trim() || symbols.includes(inputData.split(" ", ""))) {
      return alert("Il campo del titolo non è valido");
    }
    console.log(
      `Titolo: ${inputData}, descrizione: ${textAreaRef.current.value}, select: ${selectRef.current.value}`,
    );
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center mt-3">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <h2>Aggiungi Task</h2>
            <div className="d-flex flex-column">
              <label>Titolo</label>
              <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className="form-control"
                type="text"
              />

              <label>Descrizione</label>
              <textarea ref={textAreaRef} className="form-control"></textarea>

              <select className="mt-3 form-select" ref={selectRef}>
                <option value="todo">To do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
