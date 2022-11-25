import React, { ButtonHTMLAttributes } from "react";
import { Icon, IconProps } from "@iconify/react";
import { RootProps } from "./TextInput";

function ButtonSubmit(props: RootProps) {
  return (
    <button
      className={`inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md ${props.className}  text-white bg-teal-500 transition-colors hover:bg-teal-300 focus:ring-2 focus:ring-white`}
      type="submit"
    >
      {props.children}
    </button>
  );
}

interface ButtonIndexProsp extends ButtonHTMLAttributes<HTMLButtonElement> {
  ismodel: any;
  text: string;
}

function ButtonsIndex(props: ButtonIndexProsp) {
  return (
    <button
      className={
        props.ismodel
          ? "-mb-px border-b border-current p-4 text-teal-500"
          : "-mb-px border-b border- p-4 hover:text-teal-500"
      }
      {...props}
    >
      {props.text}
    </button>
  );
}

function ButtonsLogout(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={"-mb-px border-b border- p-4 hover:text-red-500"}
      {...props}
    >
      {props.children}
    </button>
  );
}

interface TextButtonProps {
  text: string;
  className?: string;
}

function ButtonText({ text, className }: TextButtonProps) {
  return (
    <>
      <span className={`text-lg font-medium mx-1 px-2 ${className} `}>
        {" "}
        {text}{" "}
      </span>
    </>
  );
}

interface ButtonIconProps extends IconProps {}

function ButtonIcon(props: ButtonIconProps) {
  return <Icon {...props} />;
}

export const Buttons = {
  Index: ButtonsIndex,
  Icon: ButtonIcon,
  Text: ButtonText,
  Logout: ButtonsLogout,
  Submit: ButtonSubmit,
};
