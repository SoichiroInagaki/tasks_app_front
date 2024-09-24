import { Box, Button, Card, CardActions, CardContent, Checkbox, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { lightBlue } from "@mui/material/colors";
import dayjs from "dayjs";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { DeleteDialog } from "./DeleteDialog";
import { TaskType } from "../types/TaskType";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormControllers } from "./FormControllers";
import { FormType } from "../types/FormType";

export const EditingTaskItem = ({task, onEditEnd}: {
  task: TaskType; 
  onEditEnd: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateTask();
  const {handleSubmit, control, formState: {errors}} = useForm<FormType>({
    defaultValues: {
      title: task.title,
      description: task.description,
      completed: task.completed,
      deadline: dayjs(task.deadline)
    }
  });

  const onSubmit: SubmitHandler<FormType> = (data, event) => {
    const requestData = {
      ...data,
      id: task.id,
      completed: data.completed ?? false,
      deadline: dayjs(data.deadline).tz(dayjs.tz.guess()).format()
    };
    event?.preventDefault();
    mutation.mutate(requestData);
    onEditEnd();
  }

  return (
    <Box>
      <Card 
        sx={{ textAlign: "center", width: 500, border: 2, borderColor: lightBlue["400"]}}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent>
          <FormControllers control={control} errors={errors}/>
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