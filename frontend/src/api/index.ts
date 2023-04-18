import axios from "axios";
import toast from "../components/Toast";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDto } from "./dto/task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response?.data?.message?.length > 0) {
      error.response.data.message.forEach((errorMessage: string) =>
        toast.error(errorMessage)
      );
    }
  }
);

const findAllTasks = async (): Promise<TaskDto[]> => {
  const { data: taskList } = await api.get("tasks");

  return taskList;
};

const removeTask = async (id: string): Promise<void> => {
  toast.success(`Task with id: "${id}" removed successfully.`);
  return await api.delete(`tasks/${id}`);
};

const findTaskById = async (id: string): Promise<TaskDto> => {
  return await api.get(`tasks/${id}`);
};

const createTask = async (data: CreateTaskDto): Promise<TaskDto> => {
  const { data: createdTask } = await api.post(`tasks`, data);
  toast.success(`Task created successfully.`);
  return createdTask;
};

const updateTask = async (
  id: string,
  data: UpdateTaskDto
): Promise<TaskDto> => {
  const { data: updatedTask } = await api.patch(`tasks/${id}`, data);
  toast.success(`Task with id: "${id}" updated successfully.`);
  return updatedTask;
};

export { findAllTasks, removeTask, findTaskById, createTask, updateTask };
