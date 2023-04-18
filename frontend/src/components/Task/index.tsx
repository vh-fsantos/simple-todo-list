import {
  ListItem,
  Box,
  IconButton,
  ListItemAvatar,
  Checkbox,
  ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { TaskDto } from "../../api/dto/task.dto";

import * as S from "./styles";

interface MyCheckboxDisplayProps
  extends React.HTMLAttributes<HTMLInputElement> {
  "data-testid"?: string;
}

interface Props {
  item: TaskDto;
  remove: (id: string) => void;
  update: (data: TaskDto) => void;
  changeStatus: (id: string, status: boolean) => void;
}

const Task = ({ item, remove, update, changeStatus }: Props) => {
  const formatDate = (date: string) => {
    if (!date) {
      return "No due date.";
    }
    return (
      "Due date: " +
      new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    );
  };

  return (
    <ListItem
      onClick={() => update(item)}
      style={{
        cursor: "pointer",
        border: "1px solid #efefef",
        borderRadius: "5px",
      }}
      divider
      secondaryAction={
        <Box display="flex" alignItems={"center"}>
          <>
            <IconButton
              edge="end"
              color="error"
              aria-label="remove"
              onClick={(e) => {
                e.stopPropagation();
                remove(item.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        </Box>
      }
    >
      <ListItemAvatar>
        <Checkbox
          inputProps={{ "data-testid": "checkbox" } as MyCheckboxDisplayProps}
          color="success"
          checked={item.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeStatus(item.id, e.target.checked);
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <S.Status status={item.status}>
              {item.status === true ? "Done" : "To do"}
            </S.Status>
            <S.Title>{item.title}</S.Title>
          </>
        }
        secondary={
          <>
            <S.DueDate>{formatDate(item.dueDate)}</S.DueDate>
            <S.Description>{item.description}</S.Description>
          </>
        }
      />
    </ListItem>
  );
};

export default Task;
