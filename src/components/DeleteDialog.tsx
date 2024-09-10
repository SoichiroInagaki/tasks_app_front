import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKey, requestUrl } from "../config/requestConfig";

const DeleteDialog = ({open, onClose, taskId}: {
  open: boolean, 
  onClose: () => void, 
  taskId: number
}) => {

  const deleteRequestUrl = `${requestUrl}/${taskId}`;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: 
      () => axios.delete(deleteRequestUrl)
      .then(res => console.log(res))
      .catch(err => console.log(err)),
    onSuccess:
      () => queryClient.invalidateQueries({queryKey: queryKey.taskList()})
  })

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
export default DeleteDialog;