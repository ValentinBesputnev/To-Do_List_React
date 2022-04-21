import React, { useState } from "react";
import axios from "axios";
import "./AddTask.scss";

const AddTask = ({ setTask }) => {
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
      : alert("no");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addNewTask()}>Add task</button>
    </div>
  );
};

export default AddTask;
