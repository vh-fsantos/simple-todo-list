import { render, screen } from "@testing-library/react";

import Footer from ".";

describe("Footer component", () => {
  const props = {
    setFilter: () => {},
    setIsCreateModalOpen: () => {},
  };

  it("should render footer", () => {
    render(<Footer {...props} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
