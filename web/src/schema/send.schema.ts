import * as yup from "yup";

export type SendSchema = yup.InferType<typeof SendSchema>;

export const SendSchema = yup.object({
  id: yup.string().optional(),
  to: yup.string().email().required(),
});
