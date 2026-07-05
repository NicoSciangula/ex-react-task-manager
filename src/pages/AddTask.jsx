import { useMemo, useRef, useState } from "react";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
  const [inputData, setInputData] = useState("");
  const textAreaRef = useRef();
  const selectRef = useRef();

  const taskTitleError = useMemo(() => {
    if (!inputData.trim()) return "Il campo del titolo non può essere vuoto";

    const symbolsError = [...inputData].some((char) => {
      return symbols.includes(char);
    });

    if (symbolsError) return "Il campo del titolo non può contenere caratteri speciali";
  }, [inputData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitleError) return alert("Il campo del titolo non è valido");

    const newTask = {
      title: inputData,
      description: textAreaRef.current.value,
      status: selectRef.current.value,
    };
    console.log("Task da aggiungere:", newTask);
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
              {taskTitleError && (
                <p className="mt-1" style={{ color: "red" }}>
                  {taskTitleError}
                </p>
              )}

              <label>Descrizione</label>
              <textarea ref={textAreaRef} className="form-control"></textarea>

              <select className="mt-3 form-select" ref={selectRef} defaultValue="To do">
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={taskTitleError}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
