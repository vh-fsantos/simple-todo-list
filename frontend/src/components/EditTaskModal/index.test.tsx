import { render, screen } from "@testing-library/react";

import EditTaskModal from ".";

describe("EditTaskModal component", () => {
  const props = {
    isOpen: true,
    close: () => {},
    update: () => {},
    task: {
      id: "1",
      title: "Task 1",
      description: "Description",
      dueDate: "2022-08-23T09:00",
      status: false,
      createdAt: "2022-08-22T03:25:40.740Z",
      updatedAt: "2022-08-22T03:25:40.740Z",
    },
  };

  it("should render edit task modal with right infos", () => {
    render(<EditTaskModal {...props} />);
    const title: HTMLInputElement = screen.getByTestId("title");
    const description: HTMLInputElement = screen.getByTestId("description");
    const dueDate: HTMLInputElement = screen.getByTestId("dueDate");
    expect(title.value).toEqual(props.task.title);
    expect(description.value).toEqual(props.task.description);
    expect(dueDate.value).toEqual(props.task.dueDate);
  });
});
