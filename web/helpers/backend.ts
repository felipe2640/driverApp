import { toast } from "react-toastify";

export interface IUser {
  expiresIn: string;
  Authorization: string;
  data: any;
}

export interface DriverData {
  Id?: string;
  Nome: string;
  Password: string;
  CPF: string;
  Marca: string;
  Modelo: string;
  Placa: string;
}

async function handleResponse(resposta: Response) {
  let resp: any = await resposta.json();

  if (resposta.ok) {
    toast.success(resp.message, {
      position: "bottom-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return resp;
  } else {
    toast.error(resp.message, {
      position: "bottom-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

//AUTH API
export function createDriver(data: DriverData): Promise<void> {
  return fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}
export function signIn(data: any): Promise<void> {
  return fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

//DRIVER API
export function getDrivers(user: any): Promise<DriverData[]> {
  return fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/driver`, {
    headers: { Authorization: `Bearer ${user}` },
  }).then((resp) => resp.json());
}

export const fetcher = (url: RequestInfo | URL, user: any) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${user}` },
  }).then((resp) => resp.json());

export function deleteDriver(CPF: string, user: any): Promise<void> {
  return fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/driver/${CPF}`, {
    headers: { Authorization: `Bearer ${user}` },
    method: "DELETE",
  }).then(handleResponse);
}

export function updateDriver(data: any, user: any): Promise<void> {
  return fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/driver/${data.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}
