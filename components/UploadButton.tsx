import { CloudUploadIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {
  onUpload: (event: any) => void;
};

const UploadButton = (props: Props) => {
  return (
    <label className="flex items-center justify-between w-56 px-8 py-2 text-indigo-600 transition-colors border border-current rounded-lg cursor-pointer hover:bg-indigo-600 group active:bg-indigo-500 focus:outline-none focus:ring">
      <span className="font-medium transition-colors group-hover:text-white">
        Upload
      </span>
      <span className="flex-shrink-0 p-2 ml-4 bg-white border border-indigo-600 rounded-full group-active:border-indigo-500">
        <CloudUploadIcon className="w-6 h-6" />
      </span>
      <input
        type="file"
        name="mdFile"
        onChange={props.onUpload}
        className="hidden"
      />
    </label>
  );
};

export default UploadButton;
