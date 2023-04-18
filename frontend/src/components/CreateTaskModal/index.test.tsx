import { fireEvent, render, screen } from "@testing-library/react";

import CreateTaskModal from ".";

describe("CreateTaskModal component", () => {
  const props = {
    isOpen: true,
    close: () => {},
    save: () => {},
  };

  it("should render title input and change value", () => {
    render(<CreateTaskModal {...props} />);
    const title: HTMLInputElement = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "New Task" } });
    expect(title.value).toBe("New Task");
  });
  it("should render description input and change value", () => {
    render(<CreateTaskModal {...props} />);
    const description: HTMLInputElement = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    fireEvent.change(description, { target: { value: "Description" } });
    expect(description.value).toBe("Description");
  });
  it("should render dueDate input and change value", () => {
    render(<CreateTaskModal {...props} />);
    const dueDate: HTMLInputElement = screen.getByTestId("dueDate");
    expect(dueDate).toBeInTheDocument();
    fireEvent.change(dueDate, { target: { value: "2022-08-23T09:00" } });
    expect(dueDate.value).toBe("2022-08-23T09:00");
  });
});
