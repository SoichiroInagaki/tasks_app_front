import { Box, Button, Card, CardActions, CardContent, Checkbox, Grid2, IconButton, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import TaskType from "../types/TaskType"
import { ChangeEvent, FormEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestUrl, tasksListQueryKey } from "../config/requestConfig";
import DeleteDialog from "./DeleteDialog";
import { lightBlue } from "@mui/material/colors";

const EditingTaskItem = ({task, onEditEnd}: {
  task: TaskType; 
  onEditEnd: () => void;
}) => {

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [deadline, setDeadline] = useState<Dayjs | null>(dayjs(task.deadline)); 
  const [open, setOpen] = useState(false);

  const putRequestUrl = `${requestUrl}/${task.id}`; 
  const requestData = {
    title: title,
    description: description,
    completed: completed,
    deadline: deadline ? deadline.tz(dayjs.tz.guess()).format() : null
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: 
      () => axios.put(putRequestUrl, requestData)
        .then(res => console.log(res))
        .catch(err => console.log(err)),
    onSuccess: () => queryClient.invalidateQueries({queryKey: tasksListQueryKey})
  });

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
    setDeadline(value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    mutation.mutate();
    onEditEnd();
  }

  function handleClickClose(){
    onEditEnd();
  }

  function handleClickDelete (e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setOpen(true);
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
          <Button onClick={handleClickClose} variant="outlined">キャンセル</Button>
          <Button type="submit" variant="outlined">更新する</Button>
          <IconButton onClick={e => handleClickDelete(e)}>
            <DeleteIcon />
          </IconButton> 
        </CardActions>
      </Card>
      <DeleteDialog open={open} onClose={() => setOpen(false)} taskId={task.id}/>
    </Box>
  )
}
export default EditingTaskItem;