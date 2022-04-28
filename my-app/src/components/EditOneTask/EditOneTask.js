import React, { useState, useContext } from "react";
import axios from "axios";
import AllTasksContext from "../../context";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EditOneTask = () => {
  const { editTask, setEditTask, setTask } = useContext(AllTasksContext);
  const navigate = useNavigate();
  const { _id, text } = editTask;
  const [inputText, setInputText] = useState(text);

  const saveChange = async (_id) => {
    // eslint-disable-next-line
    {
      text.trim()
        ? await axios
            .patch("http://localhost:3000/updateTask", {
              _id,
              text: inputText,
            })
            .then((res) => {
              setTask(res.data.data);
            })
        : alert("Task must not be empty");
    }
    setEditTask({});
    navigate("/");
  };

  const cancelChange = (text) => {
    setEditTask("");
    navigate("/");
  };

  return (
    <div>
      <input
        className="taskInput"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <IoIosCheckmarkCircle size="2em" onClick={() => saveChange(_id)} />
      <IoIosCloseCircle size="2em" onClick={() => cancelChange()} />
    </div>
  );
};

export default EditOneTask;
