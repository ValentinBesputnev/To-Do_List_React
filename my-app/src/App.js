import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import AddTask from "./components/AddTask/AddTask";
import List from "./components/List/List";
import "./App.scss";

const App = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    await axios.get("http://localhost:3000/allTasks").then((res) => {
      setTask(res.data.data);
    });
  };

  return (
    <div className="main">
      <Header />
      <AddTask setTask={setTask} />
      <List task={task} setTask={setTask} />
    </div>
  );
};

export default App;