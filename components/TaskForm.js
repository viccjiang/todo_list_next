import { useState } from "react";
import { createTask } from "../lib/api";

export default function TaskForm({ onTaskAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      setError("The field is required");
      return;
    }

    // 若表單驗證通過，清除錯誤訊息
    setError("");

    const newTask = {
      name,
      description,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const task = await createTask(newTask);
    onTaskAdded(task);
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 max-w-[500px] border-4 mx-auto mb-4 p-4"
    >
      <div className="mb-2">
        <label htmlFor="taskName">任務名稱</label>
        <input
          type="text"
          id="taskName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="輸入任務名稱"
          className="input border-b-2 w-full"
          maxLength={10}
        />
      </div>
      <div className="mb-2 ">
        <label htmlFor="taskDescription">描述任務</label>
        <input
          type="text"
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="請描述任務"
          className="input border-b-2 w-full"
          maxLength={30}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end">
        <button type="submit" className="btn border p-2">
          新增任務
        </button>
      </div>
    </form>
  );
}
