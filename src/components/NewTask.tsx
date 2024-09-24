import dayjs from "dayjs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useCreateTask } from "../hooks/useCreateTask";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControllers } from "./FormControllers";
import { FormType } from "../types/FormType";

export const NewTask = () => {
  const [open, setOpen] = useState(false);
  const mutation = useCreateTask();
  const {handleSubmit, reset, control, formState: {errors}} = useForm<FormType>({
    defaultValues: {
      title: "",
      description: "",
      deadline: dayjs().add(1, "day").startOf("day")
    }
  });

  const onSubmit: SubmitHandler<FormType> = (data, event) => {
    const requestData = {
      ...data,
      completed: false,
      deadline: data.deadline.tz(dayjs.tz.guess()).format()
    };
    event?.preventDefault();
    mutation.mutate(requestData);
    reset();
    setOpen(false);
  }; 

  return (
    <Box>
      <Fab 
        color="primary" 
        onClick={() => setOpen(true)}
        sx={{position:"fixed", bottom:16, left:16}}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>新規タスクを追加する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            新規タスクを追加するために、以下のフォームを埋めて「追加する」ボタンを押してください(「説明」は任意入力)。
          </DialogContentText>
          <FormControllers control={control} errors={errors}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button type="submit">追加する</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}