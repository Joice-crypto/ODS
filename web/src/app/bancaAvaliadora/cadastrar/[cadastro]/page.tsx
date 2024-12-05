import { HeaderOrientador } from "../../../../components/HeaderOrientador";
import { BancaCadastro } from "@/components/BancaCadastro";

export default function cadastrar() {
  return (
    <div>
      <HeaderOrientador />

      <h1 className="text-2xl text-center mt-5 font-bold">
        Cadastrar Banca Avaliadora
      </h1>
      <BancaCadastro></BancaCadastro>
    </div>
  );
}
