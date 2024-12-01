"use client";

import { FormEvent } from "react";
import Cookie from "js-cookie";
import { api } from "@/lib/api";

import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  async function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await api.post("usuario/login", {
      numero_cpf: formData.get("numero_cpf"),
      senha: formData.get("senha"),
    });

    if (result.data && result.data.token) {
      Cookie.set("token", result.data.token, { expires: 30 });
      console.log("LOGADO");
      router.push("/usuario");
    } else {
      alert("Falha na autenticação. Verifique seu CPF e senha.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmitLogin}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Seu CPF
        </label>
        <input
          type="number"
          name="numero_cpf"
          id="cpf"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="xxx.xxx-xxx-xx"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Sua senha
        </label>
        <input
          type="password"
          name="senha"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-gray-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black "
      >
        Entrar
      </button>
    </form>
  );
}
