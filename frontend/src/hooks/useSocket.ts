import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "./useRedux";
import { Todo, todosSlice } from "../features/todos/todosSlice";

const SOCKET_URL = "http://localhost:8000";

export const useSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("update-todo-progress", (updatedTodo: Todo) => {
      dispatch(todosSlice.actions.updateTodoProgress(updatedTodo));
    });

    return () => {
      socket.off("update-todo-progress");
      socket.close();
    };
  }, [dispatch]);
};
