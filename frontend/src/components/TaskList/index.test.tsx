import { render, screen } from "@testing-library/react";
import { TaskList } from ".";

describe("TaskList component", () => {
  const props = {
    taskList: [
      {
        id: "1",
        title: "Task 1",
        description: "Description",
        dueDate: "2022-08-25T09:00",
        status: false,
        createdAt: "2022-08-22T03:25:40.740Z",
        updatedAt: "2022-08-22T03:25:40.740Z",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description",
        dueDate: "2022-08-25T09:00",
        status: false,
        createdAt: "2022-08-22T03:25:40.740Z",
        updatedAt: "2022-08-22T03:25:40.740Z",
      },
    ],
    remove: (id: string) => {},
    openUpdateModal: () => {},
    changeStatus: (id: string, status: boolean) => {},
    filterTasks: () => props.taskList,
    loading: false,
  };

  it("should render list of tasks", async () => {
    render(<TaskList {...props} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should render no task registered message", async () => {
    render(<TaskList {...props} taskList={[]} />);
    expect(
      screen.getByText("No task registered, create one below.")
    ).toBeInTheDocument();
  });
});
