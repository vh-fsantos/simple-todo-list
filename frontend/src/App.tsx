import { Container } from "@mui/material";

import { useEffect, useState } from "react";

import { createTask, findAllTasks, removeTask, updateTask } from "./api";
import { TaskDto } from "./api/dto/task.dto";
import { CreateTaskDto } from "./api/dto/create-task.dto";
import { UpdateTaskDto } from "./api/dto/update-task.dto";

import CreateTaskModal from "./components/CreateTaskModal";
import EditTaskModal from "./components/EditTaskModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskList } from "./components/TaskList";
import Footer from "./components/Footer";

function App() {
  const [taskList, setTaskList] = useState<TaskDto[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskDto>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });

  const [filter, setFilter] = useState<"done" | "todo" | "today" | "all">(
    "all"
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const tasks = await findAllTasks();
      setTaskList(tasks);
      setLoading(false);
    })();
  }, []);

  const handleChangeStatus = async (id: string, status: boolean) => {
    await updateTask(id, { status });
    setTaskList((taskList) =>
      taskList.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const handleUpdate = async (id: string, data: UpdateTaskDto) => {
    const task = await updateTask(id, data);

    const _taskList = [...taskList];
    const index = _taskList.findIndex((_task) => _task.id === task.id);

    _taskList[index] = task;

    setTaskList(_taskList);
    setIsUpdateModalOpen(false);
  };

  const handleCreate = async (data: CreateTaskDto) => {
    const createdTask = await createTask(data);
    setTaskList((taskList) => [createdTask, ...taskList]);
    setIsCreateModalOpen(false);
  };

  const handleRemove = async (id: string) => {
    await removeTask(id);
    setTaskList((taskList) => taskList.filter((task) => task.id !== id));
  };

  const handleOpenUpdateModal = (task: TaskDto) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const isToday = (date: string) => {
    const today = new Date();
    const parsedDate = new Date(date);

    if (today.toDateString() === parsedDate.toDateString()) {
      return true;
    }

    return false;
  };

  const filterTasks = (tasks: TaskDto[]) => {
    switch (filter) {
      case "todo":
        return tasks.filter((task) => task.status === false);
      case "done":
        return tasks.filter((task) => task.status === true);
      case "today":
        return tasks.filter((task) => isToday(task.dueDate));
      case "all":
        return tasks;
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        style={{ top: 75 }}
      />
      <Container maxWidth="xs" style={{ position: "relative", padding: "0px" }}>
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          save={handleCreate}
          close={() => setIsCreateModalOpen(false)}
        />
        <EditTaskModal
          isOpen={isUpdateModalOpen}
          task={selectedTask}
          update={handleUpdate}
          close={() => setIsUpdateModalOpen(false)}
        />
        <TaskList
          taskList={taskList}
          loading={loading}
          remove={handleRemove}
          openUpdateModal={handleOpenUpdateModal}
          changeStatus={handleChangeStatus}
          filterTasks={filterTasks}
        />
        <Footer
          setFilter={setFilter}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
      </Container>
    </>
  );
}

export default App;
