import { CircularProgress, List } from "@mui/material";
import { TaskDto } from "../../api/dto/task.dto";
import Task from "../Task";
import * as S from "./styles";

interface Props {
  taskList: TaskDto[];
  remove: (id: string) => void;
  openUpdateModal: (task: TaskDto) => void;
  changeStatus: (id: string, status: boolean) => void;
  filterTasks: (tasks: TaskDto[]) => TaskDto[];
  loading: boolean;
}

export const TaskList = ({
  taskList,
  remove,
  openUpdateModal,
  changeStatus,
  filterTasks,
  loading,
}: Props) => {
  return (
    <S.TaskListContainer>
      {(loading && (
        <S.LoadingContainer>
          <CircularProgress />
        </S.LoadingContainer>
      )) || (
        <>
          {(taskList.length > 0 && (
            <List
              dense={false}
              style={{
                maxHeight: "calc(100% - 74px)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {filterTasks(taskList).map((task) => (
                <Task
                  key={task.id}
                  item={task}
                  remove={remove}
                  update={openUpdateModal}
                  changeStatus={changeStatus}
                />
              ))}
            </List>
          )) || (
            <S.NoTaskRegisteredMessage>
              No task registered, create one below.
            </S.NoTaskRegisteredMessage>
          )}
        </>
      )}
    </S.TaskListContainer>
  );
};
