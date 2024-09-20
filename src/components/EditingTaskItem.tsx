import { Box, Button, Card, CardActions, CardContent, Checkbox, Grid2, IconButton, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { lightBlue } from "@mui/material/colors";
import dayjs from "dayjs";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { DeleteDialog } from "./DeleteDialog";
import { TaskType } from "../types/TaskType";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const EditingTaskItem = ({task, onEditEnd}: {
  task: TaskType; 
  onEditEnd: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateTask();

  const {handleSubmit, control} = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      completed: task.completed,
      deadline: dayjs(task.deadline)
    }
  });

  type FormType = {
    title: string;
    description: string;
    completed: boolean;
    deadline: dayjs.Dayjs;
  }

  const onSubmit: SubmitHandler<FormType> = (data, event) => {
    const requestData = {
      ...data,
      id: task.id,
      deadline: dayjs(data.deadline).tz(dayjs.tz.guess()).format()
    };
    event?.preventDefault();
    mutation.mutate(requestData);
    onEditEnd();
  }



  // const [title, setTitle] = useState(task.title);
  // const [description, setDescription] = useState(task.description);
  // const [completed, setCompleted] = useState(task.completed);
  // const [deadline, setDeadline] = useState(dayjs(task.deadline)); 

  // const requestData = {
  //   id: task.id,
  //   title: title,
  //   description: description,
  //   completed: completed,
  //   deadline: deadline.tz(dayjs.tz.guess()).format() 
  // }

  // function handleSubmit(e: FormEvent<HTMLFormElement>){
  //   e.preventDefault();
  //   mutation.mutate(requestData);
  //   onEditEnd();
  // }

  // function handleCancelSubmit(){
  //   onEditEnd();
  // }  

  // function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setTitle(e.target.value);
  // }

  // function handleChangeDescription(e: ChangeEvent<HTMLInputElement>){
  //   e.preventDefault();
  //   setDescription(e.target.value);
  // }

  // function handleChangeCompleted(){
  //   setCompleted(!completed);
  // }

  // function handleChangeDeadline(value: dayjs.Dayjs | null){
  //   if(value)setDeadline(value);
  // }

  return (
    <Box>
      <Card 
        sx={{ textAlign: "center", width: 500, border: 2, borderColor: lightBlue["400"]}}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent>
          <Grid2 container direction={"column"} spacing={2}>
            <Grid2>
              <Controller
                name="title"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="タスク名"
                    fullWidth
                    multiline
                    type="text"
                    variant="standard"
                  />
                )}
              />
            </Grid2>
            <Grid2>
              <Controller
                name="description"
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    type="text"
                    label="説明"
                    fullWidth
                    multiline
                    variant="standard"
                  />
                )}
              />
            </Grid2>
            <Grid2>
              <Controller
                name="deadline"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <DateTimePicker 
                    {...field}
                    format="YYYY年MM月DD日HH時mm分" 
                    slotProps={{
                      calendarHeader: {format: "YYYY年M月"}, 
                      textField: {required: true}
                    }}
                    ampm={false}
                    label={"期限"}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </CardContent>
        <CardActions sx={{justifyContent: "space-between"}}>
          <Controller
            name="completed"
            control={control}
            render={({field}) => (
              <Checkbox {...field} checked={field.value}/> 
            )}
          />
          <Button onClick={onEditEnd} variant="outlined">キャンセル</Button>
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