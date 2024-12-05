import { ProjetoOrientandoadastro } from "@/components/ProjetoOrientando";
import { HeaderOrientador } from "../../../../components/HeaderOrientador";
import { BancaCadastro } from "@/components/BancaCadastro";

export default function cadastrar() {
  return (
    <div>
      <HeaderOrientador />

      <h1 className="text-2xl text-center mt-5 font-bold">
        Cadastrar Orientando ao Projeto
      </h1>
      <ProjetoOrientandoadastro></ProjetoOrientandoadastro>
    </div>
  );
}
