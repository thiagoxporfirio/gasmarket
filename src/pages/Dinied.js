import { Link } from "react-router-dom";

export function UserNotExists() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        id="boxForm"
      >
        <h2 className="text-2xl mb-4">☠️ OPS! Parece que você não tem permissão para isso.</h2>
        <div className="mb-4">
          <h2 className="text-lg">Verifique seu Login/Registro</h2>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
