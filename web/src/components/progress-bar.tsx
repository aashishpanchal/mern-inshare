import { twMerge } from "tailwind-merge";

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="p-3 space-y-2 bg-white border rounded-md shadow-sm ">
      <span>
        Upload <b>{progress}%</b>
      </span>
      <div className="w-full h-1 bg-gray-300 rounded-full">
        <div
          className={twMerge(
            "h-full  rounded-full bg-blue-500",
            progress > 50 && "bg-yellow-500",
            progress > 80 && "bg-red-500",
            progress === 100 && "bg-green-500"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
