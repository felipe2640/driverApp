import React from "react";
import { useState } from "react";
import { createDriver } from "../helpers/backend";

import { Buttons } from "./Button";
import { TextInput } from "./TextInput";

function FormCadastro() {
  const [data, setData] = useState<any>({
    Nome: "",
    Password: "",
    CPF: "",
    Marca: "",
    Modelo: "",
    Placa: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const dataLowercaseValue = Object.fromEntries(
      Object.entries(data).map(([key, value]: any) => [
        key,
        value.toLowerCase(),
      ])
    );

    await createDriver(dataLowercaseValue);

    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col  items-stretch gap-4 w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <div className="grid grid-flow-col-dense justify-center grid-cols-2 gap-3 grid-rows-3">
          <label htmlFor="Nome" className="flex flex-col gap-3">
            <TextInput.Text text={"Nome"} required={true} />
            <TextInput.Root className="bg-gray-100 ring-messenger">
              <TextInput.Input
                placeholder={`Digite a Nome`}
                value={data.Nome}
                onChange={(evt: any) =>
                  setData({ ...data, Nome: evt.target.value })
                }
                required
              />
            </TextInput.Root>
          </label>
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

          <label htmlFor="Marca" className="flex flex-col gap-3">
            <TextInput.Text text={"Marca"} required={true} />
            <TextInput.Root className="bg-gray-100 ring-messenger">
              <TextInput.Input
                placeholder={`Digite a Marca`}
                value={data.Marca}
                onChange={(evt: any) =>
                  setData({ ...data, Marca: evt.target.value })
                }
                required
              />
            </TextInput.Root>
          </label>
          <label htmlFor="Modelo" className="flex flex-col gap-3">
            <TextInput.Text text={"Modelo"} required={true} />
            <TextInput.Root className="bg-gray-100 ring-messenger">
              <TextInput.Input
                placeholder={`Digite a Modelo`}
                value={data.Modelo}
                onChange={(evt: any) =>
                  setData({ ...data, Modelo: evt.target.value })
                }
                required
              />
            </TextInput.Root>
          </label>
          <label htmlFor="Placa" className="flex flex-col gap-3">
            <TextInput.Text text={"Placa"} required={true} />
            <TextInput.Root className="bg-gray-100 ring-messenger">
              <TextInput.Input
                placeholder={`Digite a Placa`}
                value={data.Placa}
                onChange={(evt: any) =>
                  setData({ ...data, Placa: evt.target.value })
                }
                required
              />
            </TextInput.Root>
          </label>
        </div>

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
            <Buttons.Text text="Cadastrar" />
          )}
        </Buttons.Submit>
      </form>
    </>
  );
}

export default FormCadastro;
