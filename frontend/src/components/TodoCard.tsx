import { Card, Popconfirm, Progress, Typography } from "antd";
import { Todo } from "../features/todos/todosSlice";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

interface TodoCardProps extends Todo {
  handleDelete: (id: string, name: string) => void;
  handleEdit: (todo: Todo) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  handleDelete,
  handleEdit,
  ...todo
}) => {
  return (
    <Card
      title={todo.name}
      extra={
        <>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(todo._id, todo.name)}
          >
            <DeleteTwoTone className={"cursor-pointer"} twoToneColor={"red"} />
          </Popconfirm>
          <span onClick={() => handleEdit(todo)}>
            <EditTwoTone className={"cursor-pointer"} />
          </span>
        </>
      }
    >
      <Progress percent={todo.progress} />
      <Typography>{todo.description}</Typography>
    </Card>
  );
};
