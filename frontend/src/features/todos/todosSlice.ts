import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
  fetchTodos,
} from "./todosThunks";

export interface Todo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export enum TodoStatuses {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

interface TodosState {
  items: Todo[];
  status: TodoStatuses;
}

const initialState: TodosState = {
  items: [],
  status: TodoStatuses.IDLE,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodoProgress: (state, action) => {
      const { _id, progress } = action.payload;
      const existingTodo = state.items.find((todo) => todo._id === _id);
      if (existingTodo) {
        existingTodo.progress = progress;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchTodos async thunk
      .addCase(fetchTodos.pending, (state) => {
        state.status = TodoStatuses.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = TodoStatuses.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = TodoStatuses.FAILED;
      })

      // Handling addTodoAsync async thunk
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = TodoStatuses.SUCCEEDED;
        state.items.push(action.payload);
      })

      // Handling removeTodoAsync async thunk
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (todo) => todo._id !== action.payload
          );
        }
      )
      // Handling editTodoAsync async thunk
      .addCase(
        editTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          console.log(action.payload, "PAL");

          const index = state.items.findIndex(
            (todo) => todo._id === action.payload._id
          );

          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      );
  },
});
