import Link from "next/link";

export default function Citas() {
  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold mt-10 mb-10">
        Lista de Citas
      </h1>
      <div className="mt-auto text-center">
        <Link href="citas/crearCita/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
            Crear Cita
          </button>
        </Link>
      </div>
    </>
  );
}
