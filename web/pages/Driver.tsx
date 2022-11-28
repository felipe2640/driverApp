import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSWR from "swr";

import { Buttons } from "../components/Button";
import FormCadastro from "../components/FormCadastro";
import { useAuth } from "../context/authContext";
import { TextInput } from "../components/TextInput";
import {
  getDrivers,
  DriverData,
  deleteDriver,
  updateDriver,
  fetcher,
} from "../helpers/backend";
import FormEdit from "../components/FormEdit";

const Driver: NextPage = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  // const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filterText, setFilterText] = useState({
    Filter: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const carTH = [
    "Nome",
    "CPF",
    "Marca",
    "Modelo",
    "Placa",
    "Editar",
    "Deletar",
  ];

  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_DB_HOST}/driver`, user.Authorization],
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter(
          (item: any) =>
            item.Nome.toLowerCase().includes(filterText.Filter.toLowerCase()) ||
            item.CPF.includes(filterText.Filter.toLowerCase()) ||
            item.Placa.includes(filterText.Filter.toLowerCase())
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [filterText, data]);

  if (!data) {
    return <div>Carregando</div>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>704 Apps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex border-gray-100 text-sm font-medium align-top ">
        <Buttons.Logout onClick={logout} children="Logout" />
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 gap-6 text-center">
        <Buttons.Text text="Motoristas" />
        <div className="flex flex-col justify-center items-center gap-4 pt-3  ">
          <div className="flex flex-col  items-stretch gap-4 w-full max-w-sm align-top ">
            <div>
              <TextInput.Text text="Filtro" required={false} />
              <TextInput.Root className="bg-gray-00 ring-cyan-500">
                <TextInput.Icon
                  icon="ant-design:search-outlined"
                  color="#4B5563"
                />
                <TextInput.Input
                  placeholder="Digite o nome,CPF ou Placa"
                  onChange={(event: any) =>
                    setFilterText({ ...filterText, Filter: event.target.value })
                  }
                />
              </TextInput.Root>
            </div>
            <a
              className="text-blue-600 py-1 cursor-pointer"
              onClick={() =>
                setFilterText({
                  Filter: "",
                })
              }
            >
              Limpar
            </a>
          </div>

          <div className="flex content-center justify-center">
            <span className="text-center">{`Exibindo ${filteredData.length} de ${data.length}`}</span>
          </div>

          <div className="flex content-center justify-center flex-col">
            <table className="table-auto">
              <thead className="bg-gray-100">
                <tr className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  {carTH.map((item: any) => {
                    return (
                      <th
                        key={`${item}_blank`}
                        className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900"
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {filteredData.map((item: DriverData) => (
                <tbody
                  key={item.Id}
                  className="text-gray-600 bg-white justify-center"
                >
                  <tr className="text-center">
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase ">
                      {item.Nome}
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 ">
                      {item.CPF}
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase ">
                      {item.Marca}
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase">
                      {item.Modelo}
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase ">
                      {item.Placa}
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase ">
                      <div>
                        <Buttons.Logout onClick={openModal}>
                          <Buttons.Icon icon="material-symbols:edit" />
                        </Buttons.Logout>
                        <Transition appear show={isOpen} as={Fragment}>
                          <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeModal}
                          >
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                              <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-out duration-300"
                                  enterFrom="opacity-0 scale-95"
                                  enterTo="opacity-100 scale-100"
                                  leave="ease-in duration-200"
                                  leaveFrom="opacity-100 scale-100"
                                  leaveTo="opacity-0 scale-95"
                                >
                                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                      Payment successful
                                    </Dialog.Title>
                                    <FormEdit
                                      item={[item, user.Authorizatio]}
                                      userDialog={user.Authorization}
                                    />
                                  </Dialog.Panel>
                                </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                        </Transition>
                      </div>
                    </td>
                    <td className="border-b border-slate-200 p-4 pl-8 uppercase ">
                      <Buttons.Logout
                        onClick={() =>
                          deleteDriver(item.CPF, user.Authorization)
                        }
                      >
                        <Buttons.Icon icon="uil:trash-alt" />
                      </Buttons.Logout>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Driver;
