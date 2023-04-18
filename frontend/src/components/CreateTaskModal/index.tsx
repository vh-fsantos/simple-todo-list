import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useState } from "react";

import { CreateTaskDto } from "../../api/dto/create-task.dto";

interface Props {
  isOpen: boolean;
  close: () => void;
  save: (data: CreateTaskDto) => void;
}

const CreateTaskModal = ({ isOpen, close, save }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const cleanFields = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  const handleSave = () => {
    const data = {
      title,
      ...(!!description && { description }),
      ...(!!dueDate && { dueDate }),
    };
    save(data);
    cleanFields();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Create new task"}
      </DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{ "data-testid": "title" }}
          autoFocus
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
          inputProps={{ "data-testid": "description" }}
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          inputProps={{ "data-testid": "dueDate" }}
          margin="dense"
          id="description"
          // label="Description"
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
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;
