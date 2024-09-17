import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid2, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios";
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey, requestUrl } from "../config/requestConfig";



dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

export const NewTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dateTomorrow = dayjs().add(1, "day").startOf("day");
  const [deadline, setDeadline] = useState<Dayjs | null>(dateTomorrow); 

  const queryClient = useQueryClient();
  const requestData = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline ? deadline.tz(dayjs.tz.guess()).format() : null
  };

  const mutation = useMutation({
    mutationFn: () => axios.post(requestUrl, requestData).then(res => console.log(res)),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: queryKey.taskList()})
      setTitle("");
      setDescription("");
      setDeadline(dateTomorrow);
      setOpen(false);
    }
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate();
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
    setDeadline(value);
  }

  if(mutation.isPending){
    return <>Adding todo...</>
  }else if(mutation.isError){
    return <>An error occuerd: {mutation.error.message}</>
  }

  return (
    <Box>
      <Box sx={{position:"fixed", bottom:16, left:16}}>
        <Fab aria-label="add" color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        onClose={handleClickClose}
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
          <Button onClick={handleClickClose}>キャンセル</Button>
          <Button type="submit">追加する</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}