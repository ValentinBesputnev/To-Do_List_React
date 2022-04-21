import React, { useState } from "react";
import axios from "axios";

const List = ({ task, setTask }) => {

  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/deleteTask?id=${id}`).then((res) => {
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
      ? await axios.patch("http://localhost:3000/updateTask", {
        _id,
        text: value,
      }).then((res) => {
        setTask(res.data.data);
      })
      : alert("no");    
    }
    setEdit(null);
  };

  const cancelChange = (text) => {
    setValue(text);
    setEdit(null);
  };

  const statusTask = async (_id, isCheck) => {
    await axios.patch("http://localhost:3000/updateTask", {
      _id,
      isCheck: !isCheck,
    })
    .then((res) => {
      setTask(res.data.data);
    });
  }

  return (
    <div>
      {task.sort((a, b) =>
          a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0)
          .map((item) => (
        <div key={item._id}>
          <input 
          type='checkbox' 
          checked={item.isCheck}
          onChange={ (e) => statusTask(item._id, item.isCheck) } 
          />
          {
            !item.isCheck ?
            edit === item._id  ?
              <div>
                <input value={value} onChange={ (e) => setValue(e.target.value)} />
                <button onClick={ () => saveChange(item._id) }>Save</button>
                <button onClick={ () => cancelChange(item.text) }>Cancel</button>
              </div> :
              <div>
                { item.text }
                <button onClick={ () => editTask(item._id, item.text) }>Edit</button>
                <button onClick={ () => deleteTask(item._id) }>Del</button>
              </div> :
              <div>
              { item.text }
              <button onClick={ () => deleteTask(item._id) }>Del</button>
            </div>
          }
        
        </div>
      ))}
    </div>
  );
};

export default List;
