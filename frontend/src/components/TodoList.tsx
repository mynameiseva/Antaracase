import { TodoStatuses } from "../features/todos/todosSlice";
import { TodoCard } from "./TodoCard";
import { Button, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TodoItemInput } from "./TodoItemInput";
import { useTodos } from "../hooks/useTodos";

export const TodoList = () => {
  const {
    handleAdd,
    handleDelete,
    handleModalToggle,
    modalVisible,
    currentTodo,
    items,
    status,
  } = useTodos();

  if (status === TodoStatuses.LOADING) return <Spin />;
  if (status === TodoStatuses.FAILED)
    return <Typography>Something went wrong :(</Typography>;

  return (
    <div>
      {items.map((todo) => (
        <TodoCard
          key={todo._id}
          {...todo}
          handleDelete={handleDelete}
          handleEdit={() => handleModalToggle(todo as any)}
        />
      ))}
      {!items.length && (
        <Typography.Text>
          Start adding new tasks by clicking Add item button.
        </Typography.Text>
      )}
      <Button
        block
        onClick={() => handleModalToggle()}
        icon={<PlusOutlined />}
        type={"dashed"}
      >
        Add item
      </Button>
      <TodoItemInput
        open={modalVisible}
        onCreate={handleAdd}
        onClose={handleModalToggle}
        todoItem={currentTodo}
      />
    </div>
  );
};
