import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AllTasksContext from "./context";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import AddTask from "./components/AddTask/AddTask";
import EditOneTask from "./components/EditOneTask/EditOneTask";
import "./App.scss";

const App = () => {
  const [task, setTask] = useState([]);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    fetchFunc();
  }, []);

  const fetchFunc = async () => {
    await axios.get("http://localhost:3000/allTasks").then((res) => {
      setTask(res.data.data);
    });
  };

  return (
    <AllTasksContext.Provider value={{ task, setTask, editTask, setEditTask }}>
      <div className="main">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AddTask />
                <List />
              </div>
            }
          />
          <Route path="/edit/:id" element={<EditOneTask />} />
        </Routes>
      </div>
    </AllTasksContext.Provider>
  );
};

export default App;
