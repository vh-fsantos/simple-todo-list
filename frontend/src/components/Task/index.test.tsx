import { render, screen } from "@testing-library/react";

import Task from ".";

describe("Task component", () => {
  const props = {
    item: {
      id: "1",
      title: "Task 1",
      description: "Description",
      dueDate: "2022-08-25T09:00",
      status: false,
      createdAt: "2022-08-22T03:25:40.740Z",
      updatedAt: "2022-08-22T03:25:40.740Z",
    },
    remove: () => {},
    update: () => {},
    changeStatus: () => {},
  };

  it("should render task with right infos", () => {
    render(<Task {...props} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(
      screen.getByText("Due date: 25 August 2022, 09:00")
    ).toBeInTheDocument();
  });

  it("should render task with to do status and checkbox unchecked", () => {
    render(<Task {...props} />);
    const checkbox: HTMLInputElement = screen.getByTestId("checkbox");
    expect(checkbox.checked).toEqual(false);
    expect(screen.getByText("To do")).toBeInTheDocument();
  });
  it("should render task with done status and checkbox checked", () => {
    render(<Task {...props} item={{ ...props.item, status: true }} />);
    const checkbox: HTMLInputElement = screen.getByTestId("checkbox");
    expect(checkbox.checked).toEqual(true);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
  it("should render task with no due date", () => {
    render(<Task {...props} item={{ ...props.item, dueDate: "" }} />);
    expect(screen.getByText("No due date.")).toBeInTheDocument();
  });
});
