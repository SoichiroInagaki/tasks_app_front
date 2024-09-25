import { Stack, TextField } from "@mui/material"
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldErrors } from "react-hook-form"
import { TaskFormType } from "../types/TaskFormType";

export const FormControllers = ({control, errors}: {
  control: Control<TaskFormType>,
  errors: FieldErrors<TaskFormType>
}) => {

  return (
    <Stack direction={"column"} spacing={2}>
      <Controller
        name="title"
        control={control}
        render={({field}) => (
          <TextField
            {...field}
            autoFocus
            label="新規タスク名"
            type="text"
            fullWidth
            multiline
            variant="standard"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
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
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="deadline"
        control={control}
        render={({field}) => (
          <MobileDateTimePicker 
            {...field}
            format="YYYY年M月D日 H時m分"
            ampm={false}
            minutesStep={5}
            label={"期限"}
            slotProps={{
              calendarHeader: {format: "YYYY年M月"},
              toolbar: {toolbarFormat: "M月D日"},
              textField: {
                error: !!errors.deadline,
                helperText: errors.deadline?.message
              } 
            }}
          />
        )}
      />
    </Stack>
  );
}