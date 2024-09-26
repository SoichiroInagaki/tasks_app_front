import dayjs from "dayjs";
import { z } from "zod";

export const taskSchema = z.object({
  title: 
    z.string()
    .min(1, "入力が必須です")
    .max(20, "タスク名は20文字以内です"),
  description: 
    z.string()
    .max(50, "説明は50文字以内です")
    .regex(/^[^a-zA-Z0-9]*$/, "半角英数字を使用することはできません"),
  completed: 
    z.boolean()
    .optional(),
  deadline: 
    z.custom<dayjs.Dayjs>(
      (val: dayjs.Dayjs) => val.isAfter(dayjs()), 
      "過去の日時を設定しています"
    )
});