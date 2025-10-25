import React, { useState, useEffect } from "react";
import './index.css'; // Assure-toi que ton CSS est bien importé

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/taches";

  // Fetch tasks from Laravel API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!inputTask.trim()) return alert("Enter something please");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputTask }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
      setInputTask("");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Toggle completed status
  const toggleCompleted = async (id, completed) => {
    const newCompleted = !completed;

    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: newCompleted } : task
      )
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="todolist_container">
      <h1>To-Do List</h1>

      <div className="input_container">
        <input
          type="text"
          placeholder="Enter your task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task_component">
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="task_element">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id, task.completed)}
              />
              <span className="task_text">{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
