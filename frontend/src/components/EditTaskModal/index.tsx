import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import { TaskDto } from "../../api/dto/task.dto";
import { UpdateTaskDto } from "../../api/dto/update-task.dto";

interface Props {
  isOpen: boolean;
  close: () => void;
  update: (id: string, data: UpdateTaskDto) => void;
  task: TaskDto;
}

const EditTaskModal = ({ task, isOpen, close, update }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (task && task.id) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const cleanFields = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  const handleUpdate = () => {
    const data = {
      ...(!!title && { title }),
      ...(!!description && { description }),
      ...(!!dueDate && { dueDate }),
    };
    update(task.id, data);
    cleanFields();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Update task"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          inputProps={{ "data-testid": "title" }}
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          inputProps={{ "data-testid": "description" }}
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          inputProps={{ "data-testid": "dueDate" }}
          id="dueDate"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
