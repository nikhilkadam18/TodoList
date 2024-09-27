import React,{useState,useEffect} from "react";
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskServices';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      const taskList = await getTasks();
      setTasks(taskList.slice(0, 10)); // Fetching only the first 10 tasks
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (taskToEdit) {
      // Update task
      const updatedTask = await updateTask(taskToEdit.id, task);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setTaskToEdit(null);
    } else {
      // Add new task
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    }
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToEdit(task);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm taskToEdit={taskToEdit} onSave={handleSaveTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
