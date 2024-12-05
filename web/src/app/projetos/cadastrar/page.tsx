import { HeaderOrientador } from "@/components/HeaderOrientador";
import { ProjCadastro } from "@/components/ProjCadastro";

export default function cadastrarProjeto() {
  return (
    <div>
      <HeaderOrientador />
      <h1 className="text-3xl mt-10  text-center font-bold">
        Cadastrar Projeto
      </h1>

      <ProjCadastro></ProjCadastro>
    </div>
  );
}
