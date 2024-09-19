import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDeleteTask } from "../hooks/useDeleteTask";

export const DeleteDialog = ({open, onClose, taskId}: {
  open: boolean, 
  onClose: () => void, 
  taskId: number
}) => {

  const mutation = useDeleteTask(taskId);

  function handleClickDelete(){
    mutation.mutate();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>本当にタスクを消去しますか？</DialogTitle>
      <DialogContent><DialogContentText>
        「消去する」ボタンを押すとクリックしたタスクを削除します。操作は元には戻せません。
      </DialogContentText></DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleClickDelete}>削除する</Button>
      </DialogActions>
    </Dialog>
  )
}