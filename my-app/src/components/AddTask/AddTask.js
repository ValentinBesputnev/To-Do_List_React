import React, { useState, useContext } from "react";
import AllTasksContext from "../../context";
import axios from "axios";
import "./AddTask.scss";

const AddTask = () => {
  const { setTask } = useContext(AllTasksContext);
  const [text, setText] = useState("");

  const addNewTask = async () => {
    // eslint-disable-next-line
    {  
      text.trim()
      ? await axios.post("http://localhost:3000/createTask", {
        text,
        isCheck: false,
      }).then((res) => {
          setText("");
          setTask(res.data.data);
      })
      : alert("Task must not be empty");
    }
  };

  return (
    <div className="inbut">
      <input
        className="mainInput"
        placeholder="Enter a task"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        className="mainButton" 
        onClick={ () => addNewTask() }
      >
      ADD
      </button>
    </div>
  );
};

export default AddTask;