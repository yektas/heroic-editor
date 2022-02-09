import React, { ReactComponentElement, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
};

const Button = (props: Props) => {
  const { icon, children, onClick } = props;
  return (
    <button
      className="flex items-center justify-between w-56 px-8 py-2 text-indigo-600 transition-colors border border-current rounded-lg hover:bg-indigo-600 group active:bg-indigo-500 focus:outline-none focus:ring"
      onClick={onClick}
    >
      <span className="font-medium capitalize transition-colors group-hover:text-white">
        {children}
      </span>
      <span className="flex-shrink-0 p-2 ml-4 bg-white border border-indigo-600 rounded-full group-active:border-indigo-500">
        {icon}
      </span>
    </button>
  );
};

export default Button;
