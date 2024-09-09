import { Box, Checkbox, Paper } from "@mui/material"
import TaskType from "../types/TaskType"
import dayjs from "dayjs";

const TaskItem = ({task, onClick}: {task: TaskType, onClick: () => void}) => {
  const deadline = 
    task.deadline 
    ? dayjs(task.deadline).format("YYYY年M月D日H時m分")
    : "指定なし"
  ;

  return (
    <Paper
      sx={{  
        width: 400,
        height: 200,
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <Box>タスク名：{task.title}</Box>
      <Box>
        <p>説明：{task.description ? task.description : "特筆事項なし"}</p>
        <p>完了状態：<Checkbox checked={task.completed} /></p>
        <p>期日：{deadline}</p>
      </Box>
    </Paper>
  )
}

export default TaskItem;