import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { fileApi } from "@/apis/file.api";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SendSchema } from "@/schema/send.schema";
import { TextField } from "@/components/text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuMail as MailIcon, LuSend as SendIcon } from "react-icons/lu";

type Props = {
  url: string;
};

export default function SendMail({ url }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendSchema>({
    resolver: yupResolver(SendSchema),
  });

  const onSubmit = useCallback(
    async (data: SendSchema) => {
      const array = url.split("/");
      const id = array[array.length - 1];
      try {
        setLoading(true);
        const res = await fileApi.sendFileOnMail(id, data.to);
        const { message } = res?.data;
        toast.success(message);
      } catch (error) {
      } finally {
        reset({ to: "" });
        setLoading(false);
      }
    },
    [url]
  );

  return (
    <>
      <p className="text-sm font-semibold text-center">Or Send via Email</p>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("to")}
          label="Your Email"
          placeholder="to@gmail.com"
          left={<MailIcon />}
          error={errors.to?.message}
          disabled={!url}
        />
        <Button type="submit" disabled={!url || loading}>
          Send <SendIcon size={18} />
        </Button>
      </form>
    </>
  );
}
