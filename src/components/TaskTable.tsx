import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateTask, toggleTask, reorderTasks } from "../store/taskSlice.ts";
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, TextField } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const TaskTable: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter); // Get filter from Redux
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: number, title: string) => {
    setEditId(id);
    setEditValue(title);
  };

  const handleSave = (id: number) => {
    dispatch(updateTask({ id, title: editValue }));
    setEditId(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    dispatch(reorderTasks(reorderedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; 
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Completed</TableCell>
            <TableCell>Task</TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId="tasks">
          {(provided) => (
            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <TableCell>
                        <Checkbox checked={task.completed} onChange={() => dispatch(toggleTask(task.id))} />
                      </TableCell>
                      <TableCell onClick={() => handleEdit(task.id, task.title)}>
                        {editId === task.id ? (
                          <TextField
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleSave(task.id)}
                            autoFocus
                          />
                        ) : (
                          task.title
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
};

export default TaskTable;
