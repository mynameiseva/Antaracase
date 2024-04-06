import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "./todosSlice";

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/todos");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch todos!");
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async ({ name, description }: { name: string; description: string }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/todos", {
        _id: uuidv4(),
        name,
        description,
        progress: 0,
      });
      return response.data as Todo;
    } catch (error) {
      throw new Error("Failed to create new todo!");
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      return id;
    } catch (error) {
      throw new Error("Failed to remove todo!");
    }
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodo",
  async ({ _id, name, description, progress }: Todo) => {
    try {
      await axios.put(`http://localhost:8000/api/todos`, {
        _id,
        name,
        description,
        progress,
      });

      return { _id, name, description, progress };
    } catch (error) {
      throw new Error("Failed to edit todo!");
    }
  }
);
