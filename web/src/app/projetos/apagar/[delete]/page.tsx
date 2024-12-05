"use client";

import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function DeleteProjeto() {
  const router = useRouter();
  const params = useParams();
  const token = Cookie.get("token");

  async function DeleteProj(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.delete(`/projeto/${params.delete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Projeto excluído com sucesso!");
      router.push("/orientador");
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert(
          "Ocorreu um erro ao excluir o projeto. Tente novamente mais tarde."
        );
      }
    }
  }

  return (
    <div>
      <p className="p-5 mt-6 text-center text-xl">Excluir Projeto</p>
      <div className="flex justify-center mt-2">
        <form onSubmit={DeleteProj}>
          <p className="pl-10">Tem certeza que deseja exlcuir?</p>
          <button
            type="submit"
            className="bg-red-700 w-40  mb-64 mr-5 h-10 mt-10  hover:bg-red-900 text-white rounded-full"
          >
            Excluir
          </button>
          {/* <button
            type="submit"
            className="bg-red-500 w-28 mb-64 mr-5 h-6 mt-10 text-white-Light"
          >
            Excluir
          </button> */}
          <a href="/orientador">
            {" "}
            <button
              type="button"
              className="bg-green-700 w-40  mb-64 mr-5 h-10 mt-10  hover:bg-green-900 text-white rounded-full"
            >
              Voltar ao Inicio
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}
