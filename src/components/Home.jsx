import React, { useEffect, useState } from "react";
import Task from "./Task";
const Home = () => {
  const initialTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, desc }]);
    setTitle("");
    setDesc("");
  };
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((val, i) => {
      return i !== index;
    });
    console.log(filteredTasks);
    setTasks(filteredTasks);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <input
          name="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          name="description"
          type="text"
          placeholder="Enter Your Task"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <button type="submit">Add Task</button>
      </form>

      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.desc}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
