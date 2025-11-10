import { FaRegTrashAlt } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { Check } from 'lucide-react';

export default function Todoapp_list({ todos, setTodos, filter }) {
  const handleCheck = async (id, completed) => {
  const newCompleted = !completed;
  setTodos(prev =>
    prev.map(task =>
      task.id === id ? { ...task, completed_task: newCompleted } : task
    )
  );

  try {
    await fetch(`http://127.0.0.1:8000/api/taches/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed_task: newCompleted }),
    });
  } catch (err) {
    console.error(err);
  }
};

 
  const filteredTasks = todos.filter(
    task => filter === 'all' || task.task_type === filter
  );

  
 const deleteTask = async (id) => {
  setTodos(prev => prev.filter(task => task.id !== id));
  try {
    await fetch(`http://127.0.0.1:8000/api/taches/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="todo_list">
      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li key={task.id}>
              <input
                 id={`checkbox-${task.id}`}
                type="checkbox"
                checked={task.completed_task}
                onChange={() => handleCheck(task.id)} 
                hidden
              />
              <label htmlFor={`checkbox-${task.id}`} className="custom-checkbox">
                  {task.completed_task && <Check style={{
      position: 'absolute',
      left: '-0.5px',
      top: '-6px',
      fontWeight: "bold"
    }} size='15px' fontWeight= "bold"/>}
              </label>
              <div>
                <span>{task.text}</span>
                <button>{task.task_type}</button>
              </div>
              <button
                className="task_delete"
                onClick={() => deleteTask(task.id)}
              >
                <FaRegTrashAlt color="red" />
              </button>
            </li>
          ))
        ) : (
          <div className="no_tasks">
            <CiNoWaitingSign color="#00b4d8" size="100px" />
            <p>There are no tasks created</p>
          </div>
        )}
      </ul>
    </div>
  );
}
