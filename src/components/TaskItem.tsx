import { Box, Card, CardActionArea, CardActions, CardContent, Checkbox,  Grid2,  IconButton, Typography} from "@mui/material"
import AlarmIcon from '@mui/icons-material/Alarm';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType } from "../types/TaskType"
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";
import { lightGreen, red } from "@mui/material/colors";
import { useUpdateTask } from "../hooks/useUpdateTask";

export const TaskItem = ({task, onClick}: {
  task: TaskType, 
  onClick: (e: React.MouseEvent) => void
}) => {
  const [open, setOpen] = useState(false);

  const mutation = useUpdateTask();

  function handleChangeCompleted (checked: boolean) {
    const requestData = {
      ...task,
      completed: checked,
      deadline: dayjs(task.deadline).tz(dayjs.tz.guess()).format()
    }
    mutation.mutate(requestData);
  }

  return (
    <Box>
      <Card 
        sx={{
          textAlign: "center", 
          width: 345, 
          border: 2,  
          ...(task.completed ? {borderColor: lightGreen["800"]} : {borderColor: red["A400"]})
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Grid2 container spacing={2} direction={"column"}>
              <Grid2>
                <Typography variant="h5">
                  <Box fontWeight={"bold"}>
                    {task.title}
                  </Box>
                </Typography>
              </Grid2>
              <Grid2>
                {task.description 
                  ? <Typography variant="body1">
                      {task.description}
                    </Typography>
                  : <Typography variant="body1" sx={{color: "GrayText"}}>
                      説明なし
                    </Typography>
                }
              </Grid2>
              <Grid2>
                <Grid2 container direction={"row"} justifyContent={"center"}>
                  <Grid2>
                    <AlarmIcon />
                  </Grid2>
                  <Grid2>
                    <Typography variant="body1">
                      {dayjs(task.deadline).format("YYYY年MM月DD日 HH時mm分")}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{justifyContent: "space-between"}}>
          <Checkbox 
            checked={task.completed}
            onChange={(e) => handleChangeCompleted(e.target.checked)} 
            color="success"
            sx={{color: red["A400"]}} 
          />
          <IconButton aria-label="delete" onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <DeleteDialog open={open} onClose={() => setOpen(false)} taskId={task.id}/>
    </Box>
  )
}