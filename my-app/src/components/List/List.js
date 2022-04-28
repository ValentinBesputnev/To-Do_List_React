import React, { useContext } from "react";
import axios from "axios";
import AllTasksContext from "../../context";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./List.scss";

const List = () => {
  const { task, setTask, setEditTask } = useContext(AllTasksContext);
  const navigate = useNavigate();

  const deleteTask = async (_id) => {
    await axios
      .delete(`http://localhost:3000/deleteTask?_id=${_id}`)
      .then((res) => {
        setTask(res.data.data);
      });
  };

  const editTask = (value) => {
    setEditTask(value);
    navigate(`/edit/${value._id}`);
  };

  const statusTask = async (_id, isCheck) => {
    await axios
      .patch("http://localhost:3000/updateTask", {
        _id,
        isCheck: !isCheck,
      })
      .then((res) => {
        setTask(res.data.data);
      });
  };

  return (
    <div>
      {task
        .sort((a, b) =>
          a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
        )
        .map((item) => (
          <div className="container" key={item._id}>
            <input
              className="check"
              type="checkbox"
              checked={item.isCheck}
              onChange={(e) => statusTask(item._id, item.isCheck)}
            />
            <div className="text">
              <span>{item.text}</span>
              <IoMdCreate
                className="imgsa"
                size="2em"
                onClick={() => editTask(item)}
              />
              <IoMdTrash size="2em" onClick={() => deleteTask(item._id)} />
            </div>
            {item.isCheck && (
              <IoMdTrash size="2em" onClick={() => deleteTask(item._id)} />
            )}
          </div>
        ))}
    </div>
  );
};

export default List;
