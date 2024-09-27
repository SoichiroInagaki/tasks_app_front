import { taskSchema } from "../validation/TaskValidation";
import { z } from "zod";

export type TaskFormType = z.infer<typeof taskSchema>;