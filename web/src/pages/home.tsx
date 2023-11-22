import { useState } from "react";
import { fileApi } from "@/apis/file.api";
import CopyUrl from "@/components/copy-url";
import SendMail from "@/components/send-mail";
import FileInput from "@/components/file-input";
import ProgressBar from "@/components/progress-bar";
import undrawUpload from "@/assets/svg/undraw-upload.svg";
import AnimationWrapper from "@/components/animation-wrapper";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const onUpload = async (files: FileList) => {
    const file = files[0];
    const res = await fileApi.upload(file, {
      onUploadProgress(progressEvent) {
        progressEvent.total = progressEvent.total || progressEvent.loaded;
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setProgress(progress);
      },
    });
    if (res?.status === 200) setUrl(res.data.url);
  };

  return (
    <section className="flex items-center justify-center h-full gap-5 px-8 md:justify-evenly">
      <div className="p-8 space-y-5 bg-white shadow-md rounded-3xl">
        <FileInput onUpload={onUpload} />
        {progress > 0 && (
          <AnimationWrapper className="m-5">
            <ProgressBar progress={progress} />
          </AnimationWrapper>
        )}
        <div className="space-y-4">
          <CopyUrl url={url} />
          <SendMail url={url} />
        </div>
      </div>
      <div className="hidden lg:block w-[500px]">
        <img src={undrawUpload} className="w-full h-full" />
      </div>
    </section>
  );
}
