import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskTable from "../components/TaskTable";
import { RootState } from "../store/store.ts";

const mockStore = configureStore<RootState>();

test("renders TaskTable", () => {
  const store = mockStore({
    tasks: {
      tasks: [], 
      filter: "all", 
    },
  });

  render(
    <Provider store={store}>
      <TaskTable />
    </Provider>
  );

  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();
});
