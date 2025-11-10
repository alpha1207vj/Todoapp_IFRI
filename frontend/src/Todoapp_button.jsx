export default function Todoapp_button({todos, setTodos,setFilter,total_Count, urgent_Count, medium_Count , basse_Count,checkeCount})
{
  const deleteChecktask = async () => {
  const checkedTasks = todos.filter(t => t.completed_task);
  setTodos(prev => prev.filter(t => !t.completed_task));

  try {
    await Promise.all(
      checkedTasks.map(task =>
        fetch(`http://127.0.0.1:8000/api/taches/${task.id}`, { method: "DELETE" })
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  return(

    <>
    <div className="todo_buttons">
      <button onClick={()=>setFilter('all')}>
        Tous({total_Count})
      </button>
      <button onClick={()=>setFilter('Urgente')}>
        Urgentes({urgent_Count})
      </button>
      <button onClick={()=>setFilter('Moyenne')}>
        Moyennes({medium_Count})
      </button>
      <button onClick={()=>setFilter('Basse')}>
        Basses({basse_Count})  
      </button>
      
       <div>
            <button onClick={()=> deleteChecktask()}
            style={{
    backgroundColor: checkeCount > 0 ? "#00b4d8" : " rgba(128, 128, 128, 0.179)",
    color: checkeCount > 0 ? "white" : "black"
  }}
              >Finir la selection({checkeCount})</button>
      </div>

    </div>
  
    </>
  );
}