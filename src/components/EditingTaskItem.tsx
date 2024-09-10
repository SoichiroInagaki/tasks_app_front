import { Box, Button, Checkbox, Paper, TextField } from "@mui/material"
import TaskType from "../types/TaskType"
import { ChangeEvent, FormEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKey, requestUrl } from "../config/requestConfig";

const EditingTaskItem = ({task, onEditEnd}: {
  task: TaskType; 
  onEditEnd: () => void;
}) => {

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [deadline, setDeadline] = useState<Dayjs | null>(dayjs(task.deadline)); 

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
    onSuccess: () => queryClient.invalidateQueries({queryKey: queryKey.taskList()})
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

  return (
    <Paper
      sx={{  
        width: 600,
        height: 300,
        textAlign: "center",
      }}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Box>
        タスク名：
        <TextField
          required
          margin="dense"
          id="title"
          name="title"
          type="text"
          variant="standard"
          value={title}
          onChange={handleChangeTitle}
        />
      </Box>
      <Box>
        説明：
        <TextField
          margin="dense"
          id="description"
          name="description"
          type="text"
          multiline
          maxRows={4}
          variant="standard"
          value={description ? description : ""}
          onChange={handleChangeDescription}
        />
      </Box>
      <Box>
        完了状態：
        <Checkbox 
          checked={completed}
          id="completed"
          name="completed"
          onChange={handleChangeCompleted}
        />
      </Box>
      <Box>
        期限：
        <DateTimePicker 
          format="YYYY年M月D日 H時m分" 
          slotProps={{calendarHeader: {format: "YYYY年M月"}}}
          ampm={false}
          value={deadline}
          onChange={handleChangeDeadline}
        />
      </Box>
      <Box>
        <Button onClick={handleClickClose} variant="outlined">キャンセル</Button>
        <Button type="submit" variant="outlined">更新する</Button>
      </Box>
    </Paper>
  )
}
export default EditingTaskItem;