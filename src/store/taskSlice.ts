import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  //description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
}

const initialState: TaskState = {
  tasks: [
    { id: 1, title: "Buy groceries", completed: false },
{ id: 2, title: "Write report", completed: true },
{ id:3, title: "Buy groceries",  completed: false },
{ id:4, title: "Write report",  completed: true  },
{ id:5, title: "Buy groceries", completed: true  },
{ id:6, title: "Write report",  completed: true  },
{ id:7, title: "Buy groceries", completed: true  },
{ id:8, title: "Write report",  completed: true  },
{ id:9, title: "Buy groceries", completed: true  },
{ id:10, title: "Write report",  completed: true  },
{ id:11, title: "Buy groceries", completed: false },
{ id:12, title: "Write report",  completed: false },
{ id:13, title: "Buy groceries", completed: false },
{ id:14, title: "Write report",  completed: false },
{ id:15, title: "Buy groceries", completed: false },
{ id:16, title: "Write report",  completed: false },
{ id:17, title: "Buy groceries", completed: true  },
{ id:18, title: "Write report",  completed: false },
{ id:19, title: "Buy groceries", completed: true  },
{ id:20, title: "Write report",  completed: false },
{ id:21, title: "Buy groceries", completed: true  },
{ id:22, title: "Write report",  completed: false },
{ id:23, title: "Buy groceries", completed: true  }

  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: state.tasks.length + 1,
        title: action.payload,
       // description: action.payload,
        completed: false,
      });
    },
    updateTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<"all" | "completed" | "pending">) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, toggleTask, deleteTask, setFilter, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
