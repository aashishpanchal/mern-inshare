import * as z from "zod";

export type SendSchema = z.infer<typeof SendSchema>;

export const SendSchema = z.object({
  id: z.string(),
  to: z.string().email(),
  from: z.string().email(),
});

export type FileSchema = z.infer<typeof FileSchema>;

export const FileSchema = z.object({
  type: z.string(),
  name: z.string(),
});
