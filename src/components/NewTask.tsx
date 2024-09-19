import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid2, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import useCreateTask from "../hooks/useCreateTask";
import { ChangeEvent, FormEvent, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

export const NewTask = () => {
  const mutation = useCreateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dateTomorrow = dayjs().add(1, "day").startOf("day");
  const [deadline, setDeadline] = useState(dateTomorrow); 
  const [open, setOpen] = useState(false);

  const requestData = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline.tz(dayjs.tz.guess()).format()
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(requestData);
    setTitle("");
    setDescription("");
    setDeadline(dateTomorrow);
    setOpen(false);
  }

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function handleChangeDeadline(value: Dayjs | null){
    if(value)setDeadline(value);
  }

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
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>新規タスクを追加する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            新規タスクを追加するために、以下のフォームを埋めて「追加する」ボタンを押してください(「説明」は任意入力)。
          </DialogContentText>
          <Grid2 container direction={"column"} spacing={2}>
            <Grid2>
              <TextField
                autoFocus
                required
                label="新規タスク名"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={handleChangeTitle}
              />
            </Grid2>
            <Grid2>
              <TextField
                label="説明"
                type="text"
                fullWidth
                multiline
                variant="standard"
                value={description}
                onChange={handleChangeDescription}
              />
            </Grid2>
            <Grid2>
              <MobileDateTimePicker 
                format="YYYY年M月D日 H時m分" 
                slotProps={{
                  calendarHeader: {format: "YYYY年M月"}, 
                  textField: {required: true}
                }}
                ampm={false}
                minutesStep={5}
                label={"期限"}
                value={deadline}
                onChange={handleChangeDeadline}
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