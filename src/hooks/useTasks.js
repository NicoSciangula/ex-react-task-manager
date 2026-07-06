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

  const addTask = async (newTask) => {
    const fetchPostTask = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await fetchPostTask.json();

    if (!success) throw new Error(message);

    setTasks((curr) => [...curr, task]);
  };
  const deleteTask = async (taskId) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();

    const filterDeleteTask = tasks.filter((task) => task.id !== taskId);

    setTasks(filterDeleteTask);

    if (!success) throw new Error(message);
    console.log(success);
  };
  const updateTask = () => {
    //Esegui codice
  };

  return { tasks, addTask, deleteTask, updateTask };
}
