import { useRef } from "react";
import toast from "react-hot-toast";
import { LuCopy as CopyIcon } from "react-icons/lu";

type Props = {
  url: string;
};

export default function CopyUrl(props: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const onCopy = () => {
    if (props.url) {
      ref.current?.select();
      // copy url
      navigator.clipboard.writeText(props.url);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <>
      <p className="text-sm font-semibold text-center">
        Link expires in 24 hrs
      </p>
      <div className="flex items-center justify-between gap-3">
        <input
          ref={ref}
          readOnly
          type="text"
          value={props.url}
          placeholder="File URL"
          className="w-full p-1 pl-3 text-base border-2 border-blue-300 border-dashed rounded-md outline-none bg-blue-100/20"
        />
        <button
          onClick={onCopy}
          disabled={!props.url}
          className="active:scale-95 disabled:scale-100 disabled:opacity-25"
        >
          <CopyIcon size={24} />
        </button>
      </div>
    </>
  );
}
