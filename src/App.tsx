import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import TaskTable from "./components/TaskTable.tsx";
import Filter from "./components/Filter.tsx";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <h1>Task Manager</h1>
        <Filter />
        <TaskTable />
      </Container>
    </Provider>
  );
};

export default App;
