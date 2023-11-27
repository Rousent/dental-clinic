import Link from "next/link";

export default function Pacientes() {
  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold mt-10 mb-10">
        Lista de Pacientes
      </h1>
      <div className="mt-auto text-center">
        <Link href="pacientes/crearPaciente/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
            Crear Paciente
          </button>
        </Link>
      </div>
    </>
  );
}
