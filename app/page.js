"use client";

// app/page.js
import { useEffect, useState } from "react";
import {
  fetchTasks,
  deleteTask,
  updateTaskStatus,
  createTask,
} from "../lib/api";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      if (Array.isArray(data)) {
        const sortedTasks = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sortedTasks);
      } else {
        console.error("Fetched data is not an array");
      }
    };

    loadTasks();
  }, []);

  const handleTaskAdded = async (task) => {
    const newTask = await createTask(task);
    setTasks(
      [newTask, ...tasks].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = async (id, is_completed) => {
    await updateTaskStatus(id, is_completed);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, is_completed } : task))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 text-cyan-800 font-extrabold text-[40px] py-4 text-center">
        My ToDo List
      </h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <div className="mb-4 max-w-[500px] mx-auto">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="btn btn-primary border p-2"
        >
          {showCompleted ? "隱藏" : "顯示"}完成任務
        </button>
      </div>
      <ul className="max-w-[500px] mx-auto">
        {tasks
          .filter((task) => showCompleted || !task.is_completed)
          .map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center mb-4 p-4 border-b-2"
            >
              <div>
                <p>{task.name}</p>
                <p className="text-gray-500 font-light text-sm">
                  {new Date(task.updated_at)
                    .toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "/")}
                </p>
              </div>
              <div className="grid gap-y-2">
                <button
                  onClick={() => toggleTaskStatus(task.id, !task.is_completed)}
                  className={`border p-2 btn ${
                    task.is_completed ? "btn-warning" : "btn-success"
                  }`}
                >
                  {task.is_completed ? "完成" : "未完成"}
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger border p-2"
                >
                  刪除任務
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
