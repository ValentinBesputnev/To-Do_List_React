import React, { useState } from "react";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import "./List.scss";

const List = ({ task, setTask }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:3000/deleteTask?id=${id}`)
      .then((res) => {
        setTask(res.data.data);
      });
  };

  const editTask = (id, text) => {
    setEdit(id);
    setValue(text);
  };

  const saveChange = async (_id) => {
    // eslint-disable-next-line
    {
      value.trim()
        ? await axios
            .patch("http://localhost:3000/updateTask", {
              _id,
              text: value,
            })
            .then((res) => {
              setTask(res.data.data);
            })
        : alert("Task must not be empty");
    }
    setEdit(null);
  };

  const cancelChange = (text) => {
    setValue(text);
    setEdit(null);
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
      {task.sort((a, b) =>
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
            {!item.isCheck ? (
              edit === item._id ? (
                <div>
                  <input
                    className="taskInput"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <IoIosCheckmarkCircle
                    size="2em"
                    onClick={() => saveChange(item._id)}
                  />
                  <IoIosCloseCircle
                    size="2em"
                    onClick={() => cancelChange(item.text)}
                  />
                </div>
              ) : (
                <div className="text">
                  <span>{item.text}</span>
                  <IoMdCreate
                    className="imgsa"
                    size="2em"
                    onClick={() => editTask(item._id, item.text)}
                  />
                  <IoMdTrash size="2em" onClick={() => deleteTask(item._id)} />
                </div>
              )
            ) : (
              <div className="text">
                <span>{item.text}</span>
                <IoMdTrash size="2em" onClick={() => deleteTask(item._id)} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default List;