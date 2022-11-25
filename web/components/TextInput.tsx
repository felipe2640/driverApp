import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Icon, IconProps } from "@iconify/react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export interface RootProps {
  children: ReactNode;
  className?: string;
}

function TextInputRoot(props: RootProps) {
  return (
    <div
      className={`${props.className} flex items-center gap-3 w-full py-4 px-3 rounded-lg  focus-within:ring-2 ring-cyan-100`}
    >
      {props.children}
    </div>
  );
}

interface TextInputTextProps {
  text: string;
  required: boolean;
}

function TextInputText(props: TextInputTextProps) {
  return (
    <span
      className={
        props.required
          ? "after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
          : "block text-sm font-medium text-slate-700"
      }
    >
      {props.text}
    </span>
  );
}

interface TextInputIconProps extends IconProps {}

function TextInputIcon(props: TextInputIconProps) {
  return <Icon {...props} />;
}

function TextInputInput(props: TextInputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-black text-xs outline-none  "
      {...props}
    />
  );
}

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
  Text: TextInputText,
};
