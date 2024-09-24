import dayjs from "dayjs"

export type FormType = {
  title: string,
  description: string,
  completed?: boolean,
  deadline: dayjs.Dayjs
};