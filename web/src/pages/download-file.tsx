import { fileApi } from "@/apis/file.api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LuDownload as DownloadIcon } from "react-icons/lu";
import downloadSvg from "@/assets/svg/download.svg";
import toast from "react-hot-toast";

export default function DownloadFile() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<Record<string, any>>({});

  const getFile = async (uid: string) => {
    try {
      const res = await fileApi.getFile(uid);
      setFile(res?.data);
    } catch (error) {
      navigate("/", { replace: true });
    }
  };

  const onDownload = async () => {
    const res = await fileApi.download(uid as string);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(res?.data);
    link.setAttribute("download", file?.filename);
    link.click();
    link.remove();
    toast.success("File downloaded successfully");
  };

  useEffect(() => {
    getFile(uid as string);
  }, []);

  return (
    <section className="flex items-center justify-center h-full px-8 md:justify-evenly">
      <div className="p-8 bg-white shadow-md rounded-3xl w-96 lg:w-[500px] min-h-[200px] flex flex-col justify-center items-center space-y-5">
        <div className="w-36">
          <img src={downloadSvg} className="w-full" />
        </div>
        <h1 className="text-xl font-semibold">
          Your file is ready to download
        </h1>
        <span className="text-sm">Link expires in 24 hours</span>
        <div className="text-center">
          <p className="text-sm font-semibold">{file?.filename}</p>
          <small>{((file?.fileSize || 0) / 1000).toFixed(0)}KB</small>
        </div>
        <Button onClick={onDownload}>
          Download File <DownloadIcon size={20} />
        </Button>
      </div>
    </section>
  );
}
