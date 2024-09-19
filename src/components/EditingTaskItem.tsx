import { Box, Button, Card, CardActions, CardContent, Checkbox, Grid2, IconButton, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, FormEvent, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { lightBlue } from "@mui/material/colors";
import dayjs from "dayjs";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { DeleteDialog } from "./DeleteDialog";
import { TaskType } from "../types/TaskType";

export const EditingTaskItem = ({task, onEditEnd}: {
  task: TaskType; 
  onEditEnd: () => void;
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [deadline, setDeadline] = useState(dayjs(task.deadline)); 
  const [open, setOpen] = useState(false);

  const mutation = useUpdateTask();
  const requestData = {
    id: task.id,
    title: title,
    description: description,
    completed: completed,
    deadline: deadline.tz(dayjs.tz.guess()).format() 
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    mutation.mutate(requestData);
    onEditEnd();
  }

  function handleCancelSubmit(){
    onEditEnd();
  }  

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleChangeDescription(e: ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setDescription(e.target.value);
  }

  function handleChangeCompleted(){
    setCompleted(!completed);
  }

  function handleChangeDeadline(value: dayjs.Dayjs | null){
    if(value)setDeadline(value);
  }

  return (
    <Box>
      <Card 
        sx={{ textAlign: "center", width: 500, border: 2, borderColor: lightBlue["400"]}}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <CardContent>
          <Grid2 container direction={"column"} spacing={2}>
            <Grid2>
              <TextField
                autoFocus
                required
                label="タスク名"
                fullWidth
                multiline
                type="text"
                variant="standard"
                value={title}
                onChange={handleChangeTitle}
              />
            </Grid2>
            <Grid2>
              <TextField
                type="text"
                label="説明"
                fullWidth
                multiline
                variant="standard"
                value={description ? description : ""}
                onChange={handleChangeDescription}
              />
            </Grid2>
            <Grid2>
              <DateTimePicker 
                format="YYYY年MM月DD日HH時mm分" 
                slotProps={{
                  calendarHeader: {format: "YYYY年M月"}, 
                  textField: {required: true}
                }}
                ampm={false}
                label={"期限"}
                value={deadline}
                onChange={handleChangeDeadline}
              />
            </Grid2>
          </Grid2>
        </CardContent>
        <CardActions sx={{justifyContent: "space-between"}}>
          <Checkbox 
            checked={completed} 
            onChange={handleChangeCompleted}
          />
          <Button onClick={handleCancelSubmit} variant="outlined">キャンセル</Button>
          <Button type="submit" variant="outlined">更新する</Button>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton> 
        </CardActions>
      </Card>
      <DeleteDialog open={open} onClose={() => setOpen(false)} taskId={task.id}/>
    </Box>
  )
}