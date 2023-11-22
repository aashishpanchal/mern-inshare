import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import fileSvg from "@/assets/svg/file.svg";

type Props = {
  onUpload?: (files: FileList) => void;
  maxAllowedSize?: number;
};

type DragEvent = React.DragEvent<HTMLDivElement>;

const SIZE = 100 * 1024 * 1024; //100mb

export default function FileInput({ onUpload, maxAllowedSize = SIZE }: Props) {
  const [dragging, setDragging] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) validateFile(files);
  };

  const validateFile = (files: FileList) => {
    if (files.length === 1) {
      if (files[0].size < maxAllowedSize) {
        onUpload?.(files);
      } else {
        toast.error("Max file size is 100MB");
      }
    } else if (files.length > 1) {
      toast.error("You can't upload multiple files");
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    validateFile(files);
    setDragging(false);
  };

  const onDragEnter = () => setDragging(true);
  const onDragLeave = () => setDragging(false);

  return (
    <div
      className={twMerge(
        "w-96 lg:w-[500px] min-h-[200px] border-2 border-dashed rounded-2xl justify-center items-center flex flex-col gap-5 transition-colors duration-300 ease-in-out",
        dragging && "bg-blue-100 border-blue-500"
      )}
      ref={wrapperRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnter={onDragEnter}
    >
      <img
        src={fileSvg}
        draggable="false"
        className="w-16 pointer-events-none"
        alt="File Icon"
      />
      <input type="file" id="file" className="hidden" onChange={onChange} />
      <div className={twMerge("text-base", dragging && "pointer-events-none")}>
        Drop your Files here or,{" "}
        <label
          htmlFor="file"
          className="font-semibold text-blue-400 hover:cursor-pointer hover:underline"
        >
          Browse
        </label>
      </div>
    </div>
  );
}
