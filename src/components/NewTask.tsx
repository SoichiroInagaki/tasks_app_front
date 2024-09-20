import dayjs from "dayjs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid2, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import { useCreateTask } from "../hooks/useCreateTask";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const NewTask = () => {
  const [open, setOpen] = useState(false);
  const mutation = useCreateTask();
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: dayjs().add(1, "day").startOf("day")
    }
  });

  type FormType = {
    title: string;
    description: string;
    deadline: dayjs.Dayjs
  };

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
      <Box sx={{position:"fixed", bottom:16, left:16}}>
        <Fab aria-label="add" color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Box>
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
                    label="新規タスク名"
                    type="text"
                    fullWidth
                    multiline
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
                    label="説明"
                    type="text"
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
                  <MobileDateTimePicker 
                    {...field}
                    format="YYYY年M月D日 H時m分" 
                    slotProps={{
                      calendarHeader: {format: "YYYY年M月"}, 
                    }}
                    ampm={false}
                    minutesStep={5}
                    label={"期限"}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button type="submit">追加する</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}