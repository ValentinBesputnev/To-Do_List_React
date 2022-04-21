import { useState, useEffect } from "react";
import AddTask from "./components/AddTask/AddTask";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import axios from "axios";

function App() {
  const [task, setTask] = useState([])

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    await axios.get("http://localhost:3000/allTasks").then((res) => {
      setTask(res.data.data);
    });
  };

  return (
    <div>
      <Header />
      <AddTask setTask={setTask} />
      <List task={task} setTask={setTask} />
    </div>
  );
}

export default App;