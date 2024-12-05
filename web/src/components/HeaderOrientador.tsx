import Link from "next/link";
import { getUser } from "@/lib/auth";

export async function HeaderOrientador() {
  const user = getUser();

  return (
    <div>
      <header className=" w-screen h-20 grid grid-rows-1">
        <ul className=" p-9 ">
          <div className="flex justify-between ">
            <Link className="text-dark text-xl font-sans " href="/orientador">
              SUP - UFGJW
            </Link>
            <p>Bem-Vindo(a), {(await user).name}</p>
            <li>
              <Link href="api/auth/logout">
                <button
                  className=" text-white bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  type="button"
                >
                  Sair
                </button>
              </Link>
            </li>
          </div>
        </ul>
      </header>
    </div>
  );
}
