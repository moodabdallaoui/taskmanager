import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Task Manager heading", () => {
  render(<App />);
  const heading = screen.getByText(/Task Manager/i);
  expect(heading).toBeInTheDocument();
});

