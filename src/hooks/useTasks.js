import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = () => {
    //Esegui codice
  };
  const deleteTask = () => {
    //Esegui codice
  };
  const updateTask = () => {
    //Esegui codice
  };

  return { tasks, addTask, deleteTask, updateTask };
}
