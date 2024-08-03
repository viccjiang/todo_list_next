import axios from "axios";

const api = axios.create({
  baseURL: "https://wayi.league-funny.com/api",
});

export const fetchTasks = async (page = 1, type = "all") => {
  const response = await api.get(`/task`, { params: { page, type } });
  return response.data.data;
};

export const createTask = async (task) => {
  const response = await api.post(`/task`, task);
  return response.data.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/task/${id}`, task);
  return response.data.data;
};

export const updateTaskStatus = async (id, is_completed) => {
  const response = await api.patch(`/task/${id}`, { is_completed });
  return response.data.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/task/${id}`);
};
