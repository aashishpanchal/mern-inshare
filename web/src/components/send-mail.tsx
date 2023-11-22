import { useState } from "react";
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

export default function SendMail(props: Props) {
  const [loading, setLoading] = useState(false);
  const array = props.url.split("/");
  const id = array[array.length - 1];

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendSchema>({
    resolver: yupResolver(SendSchema),
  });

  async function onSubmit(data: SendSchema) {
    try {
      setLoading(true);
      const res = await fileApi.sendFileOnMail(data);
      const { message } = res?.data;
      toast.success(message);
    } catch (error) {
    } finally {
      reset({ to: "", from: "" });
      setLoading(false);
    }
  }

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
          disabled={!props.url}
        />
        <TextField
          {...register("from")}
          label="Receiver's Email"
          placeholder="from@gmail.com"
          left={<MailIcon />}
          error={errors.from?.message}
          disabled={!props.url}
        />
        <input type="hidden" defaultValue={id} {...register("id")} />
        <Button type="submit" disabled={!props.url || loading}>
          Send <SendIcon size={18} />
        </Button>
      </form>
    </>
  );
}
