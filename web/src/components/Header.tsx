import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { cookies } from "next/headers";

export function Header() {
  // const isAuth = cookies().has("token");

  // fazer a verificação de se o usuario esta logado ou não
  // se estiver ele vai mudar o tipo de header

  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <header className=" w-screen h-20 grid grid-rows-1   ">
        <ul className=" p-9 ">
          <div className="flex justify-between ">
            <Link className="text-dark text-xl font-sans " href="/">
              SUP - UFGJW
            </Link>
            <li className="p-2">Início</li>
            <Link href="/projetos">
              <li className="p-2">Projetos</li>
            </Link>
            <li className="p-2">Contato</li>

            <li>
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className=" text-white bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                type="button"
              >
                Login
              </button>
            </li>
          </div>
        </ul>
      </header>

      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>

      <div
        id="authentication-modal"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Entrar na plataforma
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <LoginForm></LoginForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
