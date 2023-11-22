import * as yup from "yup";

export type SendSchema = yup.InferType<typeof SendSchema>;

export const SendSchema = yup.object({
  to: yup.string().email().required(),
});
