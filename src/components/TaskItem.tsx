import { Box, Button, Checkbox, Paper } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import TaskType from "../types/TaskType"
import dayjs from "dayjs";
import { useState } from "react";
import { queryKey, requestUrl } from "../config/requestConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DeleteDialog from "./DeleteDialog";

const TaskItem = ({task, onClick}: {task: TaskType, onClick: () => void}) => {

  const [completed, setCompleted] = useState(task.completed);
  const [open, setOpen] = useState(false);

  const putRequestUrl = `${requestUrl}/${task.id}`;
  const requestData = {
    ...task,
    completed: completed,
    deadline: dayjs(task.deadline).tz(dayjs.tz.guess()).format()
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: 
      () => axios.put(putRequestUrl, requestData)
      .then(req => console.log(req))
      .catch(err => console.log(err)),
    onSuccess: () => queryClient.invalidateQueries({queryKey: queryKey.taskList()})
  });

  function handleChangeCompleted (e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    mutation.mutate();
    setCompleted(!completed);
  }

  function handleClickDelete (e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <Box>
      <Paper
        sx={{  
          width: 400,
          height: 250,
          textAlign: "center",
        }}
        onClick={onClick}
      >
        <Box>タスク名：{task.title}</Box>
        <Box>
          <p>説明：{task.description ? task.description : "特筆事項なし"}</p>
          <p>
            完了状態：
            <Checkbox 
              checked={completed}
              onChange={handleChangeCompleted}
              onClick={e => e.stopPropagation()}
            />
          </p>
          <p>期日：{dayjs(task.deadline).format("YYYY年M月D日H時m分")}</p>
        </Box>
        <Button 
          variant="outlined"
          onClick={e => handleClickDelete(e)}
          startIcon={<DeleteIcon />}
        >
          消去
        </Button>
      </Paper>

      {/**削除ボタン押下時に開くダイアログ */}
      <DeleteDialog open={open} onClose={() => setOpen(false)} taskId={task.id}/>
    </Box>
  )
}

export default TaskItem;