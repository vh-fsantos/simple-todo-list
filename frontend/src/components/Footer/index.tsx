import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Fab } from "@mui/material";

interface Props {
  setFilter: (type: "done" | "todo" | "today" | "all") => void;
  setIsCreateModalOpen: (status: boolean) => void;
}

const Footer = ({ setFilter, setIsCreateModalOpen }: Props) => {
  return (
    <Box
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="10px"
      width="100%"
      bottom="0px"
      style={{
        borderTop: "1px solid #efefef",
        padding: "10px 0px",
        boxSizing: "border-box",
      }}
    >
      <Button onClick={() => setFilter("all")} variant="contained" size="small">
        All
      </Button>
      <Button
        onClick={() => setFilter("todo")}
        variant="contained"
        size="small"
      >
        To Do
      </Button>
      <Button
        onClick={() => setFilter("done")}
        variant="contained"
        size="small"
      >
        Done
      </Button>
      <Button
        onClick={() => setFilter("today")}
        variant="contained"
        size="small"
      >
        Today
      </Button>
      <Fab
        color="secondary"
        aria-label="add"
        size="small"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
export default Footer;
