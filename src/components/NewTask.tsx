import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export const NewTask = () => {
  return (
    <Fab aria-label="add" color="primary" >
      <AddIcon />
    </Fab>
  )
}