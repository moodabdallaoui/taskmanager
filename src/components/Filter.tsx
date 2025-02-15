import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/taskSlice.ts";
import { Button, ButtonGroup } from "@mui/material";

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ButtonGroup>
      <Button onClick={() => dispatch(setFilter("all"))}>All</Button>
      <Button onClick={() => dispatch(setFilter("completed"))}>Completed</Button>
      <Button onClick={() => dispatch(setFilter("pending"))}>Pending</Button>
    </ButtonGroup>
  );
};

export default Filter;
