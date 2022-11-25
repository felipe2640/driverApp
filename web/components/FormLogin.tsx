import Head from "next/head";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { TextInput } from "../components/TextInput";
import { Buttons } from "../components/Button";
import React from "react";

function FormLogin({}) {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    CPF: "",
    Password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await login(data);

    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col items-stretch gap-6 w-full max-w-sm "
        onSubmit={handleLogin}
      >
        <label htmlFor="CPF" className="flex flex-col gap-3">
          <TextInput.Text text={"CPF"} required={true} />
          <TextInput.Root className="bg-gray-100 ring-messenger">
            <TextInput.Input
              placeholder={`Digite o CPF`}
              value={data.CPF}
              onChange={(evt: any) =>
                setData({ ...data, CPF: evt.target.value })
              }
              required
            />
          </TextInput.Root>
        </label>
        <label htmlFor="Password" className="flex flex-col gap-3">
          <TextInput.Text text={"Senha"} required={true} />
          <TextInput.Root className="bg-gray-100 ring-messenger">
            <TextInput.Input
              placeholder={`*******`}
              type="password"
              value={data.Password}
              onChange={(evt: any) =>
                setData({ ...data, Password: evt.target.value })
              }
              required
            />
          </TextInput.Root>
        </label>

        <Buttons.Submit>
          {loading ? (
            <>
              <Buttons.Icon
                icon="icomoon-free:spinner2"
                className="animate-spin h-5 w-5 mx-2 cursor-progress"
              />
              <Buttons.Text text="Processing..." />
            </>
          ) : (
            <Buttons.Text text="Login" />
          )}
        </Buttons.Submit>
      </form>
    </>
  );
}

export default FormLogin;
