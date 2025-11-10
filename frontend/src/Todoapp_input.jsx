import { useState } from "react";

export default function Todoapp_input({todos,setTodos})
{
  const [input_value, setInput_value] = useState('');
  const [select_value, setSelect_value] = useState('Urgente');

  const CreateTask = async (text, type) => {
  if (!text.trim()) return;

  const newTask = {
    text,
    task_type: type,
    completed_task: false,
  };

  // Optimistic update
  setTodos(prev => [...prev, { ...newTask, id: Date.now() }]);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/taches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const savedTask = await res.json();

    // Replace temporary id with backend id
    setTodos(prev => prev.map(task => task.id === newTask.id ? savedTask : task));
  } catch (err) {
    console.error(err);
  }
};



  return(
    <>
      <div className="todo_input">
        <input type="text" placeholder="Ajouter une tache..." name="input_task" id="input_task" value={input_value}
        onChange={(e)=>setInput_value(e.target.value)} />
        <select name="select_task" id="select_task" value={select_value} onChange={(e) => setSelect_value(e.target.value)}>
          <option value="Urgente">Urgente</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button onClick={()=> CreateTask(input_value,select_value)}>Ajouter</button>
      </div>
    </>
  );
}