import { useState,useEffect} from "react";
import Todoapp_list from "./Todoapp_list";
import Todoapp_input from "./Todoapp_input";
import Todoapp_button from "./Todoapp_button";

export default function todoapp()
{
   useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/taches");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchTasks();
}, []);

  const [todos,setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  let total_Count = todos.length;
  let urgent_Count = todos.filter(task=> task.task_type === 'Urgente').length;
  let medium_Count = todos.filter(task=> task.task_type === 'Moyenne').length;
  let basse_Count = todos.filter(task=> task.task_type === 'Basse').length;
  let  checkeCount = todos.filter(t=>t.completed_task === true).length;

  return(
     <>
     <div className="todo_container">
        <Todoapp_input todos = {todos} setTodos = {setTodos}></Todoapp_input>
        <Todoapp_button setFilter = {setFilter} basse_Count = {basse_Count} urgent_Count = {urgent_Count} medium_Count = {medium_Count} total_Count = {total_Count} checkeCount={checkeCount} todos ={todos} setTodos ={setTodos}></Todoapp_button>
        <Todoapp_list todos = {todos} setTodos = {setTodos} filter = {filter}></Todoapp_list>
     </div>
     </>
  );
}