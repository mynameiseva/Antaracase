import { useEffect, useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { useAppDispatch } from "../hooks/useRedux";
import { Todo } from "../features/todos/todosSlice";
import { editTodoAsync } from "../features/todos/todosThunks";

interface TodoItemInputProps {
  open: boolean;
  onCreate: (name: string, description: string) => void;
  onClose: () => void;
  todoItem?: Todo | null;
}

export const TodoItemInput: React.FC<TodoItemInputProps> = ({
  onCreate,
  open,
  onClose,
  todoItem,
}) => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    progress: 0,
  });

  useEffect(() => {
    setItem({
      name: todoItem?.name || "",
      description: todoItem?.description || "",
      progress: todoItem?.progress || 0,
    });
  }, [todoItem]);

  const dispatch = useAppDispatch();

  const isEditing = !!todoItem?._id;

  const handleCreate = () => {
    if (isEditing) {
      dispatch(
        editTodoAsync({
          _id: todoItem._id,
          ...item,
        })
      );
    } else {
      onCreate(item.name, item.description);
    }
    setItem({ name: "", description: "", progress: 0 });
    onClose();
  };

  const handleClose = () => {
    onClose();
    setItem({ name: "", description: "", progress: 0 });
  };

  const onChange = ({
    target: { name: fieldName, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prevTodoItem) => ({ ...prevTodoItem, [fieldName]: value }));
  };

  return (
    <Modal
      title={"New Item"}
      open={open}
      footer={
        <>
          <Button danger onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            {isEditing ? "Edit" : "Create"}
          </Button>
        </>
      }
    >
      <Typography>Name</Typography>
      <Input
        name="name"
        placeholder="Enter name"
        value={item.name}
        onChange={onChange}
      />
      <Typography>Description</Typography>
      <Input
        name="description"
        placeholder="Enter description"
        value={item.description}
        onChange={onChange}
      />
      {isEditing && (
        <>
          <Typography>Progress</Typography>
          <Input
            name="description"
            type="number"
            placeholder="Enter progress"
            value={item.progress}
            onChange={onChange}
          />
        </>
      )}
    </Modal>
  );
};
