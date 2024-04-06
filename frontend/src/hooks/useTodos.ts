import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useSocket } from "./useSocket";
import { notification } from "antd";
import { Todo } from "../features/todos/todosSlice";
import { addTodoAsync, deleteTodoAsync, fetchTodos } from "../features/todos/todosThunks";

export const useTodos = () => {
  useSocket();

  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.todos);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleModalToggle = (todo: Todo | null = null) => {
    setCurrentTodo(todo);
    setModalVisible(!modalVisible);
  };

  const handleAdd = (name: string, description: string) => {
    if (!name.trim() || !description.trim()) {
      return notification.error({
        message: "Task name and description should be filled.",
      });
    }

    dispatch(addTodoAsync({ name, description }));
    handleModalToggle();

    notification.success({ message: `Task ${name} added.` });
  };

  const handleDelete = (id: string, name: string) => {
    dispatch(deleteTodoAsync(id));

    notification.success({
      message: `Task ${name} is deleted`,
    });
  };

  return {
    handleAdd,
    handleDelete,
    handleModalToggle,
    modalVisible,
    currentTodo,
    items,
    status,
  };
};
