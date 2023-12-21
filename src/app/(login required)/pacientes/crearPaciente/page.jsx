'use client'
import { useState } from "react";
import { Button } from "@nextui-org/react";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import ConfirmationModal from "./ConfirmationModal";
import { supabase } from "../../Supabase"
import Link from "next/link";

export default function Pruebas() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  

  const [data, setData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmation = () => {
    // Abrir el modal de confirmación
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    // Cerrar el modal de confirmación
    setIsConfirmationModalOpen(false);

    // Validar que los campos requeridos estén llenos
    if (!data.nombre || !data.apellido_paterno || !data.apellido_materno) {
      console.error("Error al insertar datos: campos requeridos vacíos");
      setIsErrorModalOpen(true);
      
      return;
    }

    // Realiza el registro en la tabla de Supabase
    const { data: insertedData, error } = await supabase
      .from("pacientes")
      .insert([data]);

    if (error) {
      console.error("Error al insertar datos:", error.message);
      console.log("Registro fallido:", data);
      setIsErrorModalOpen(true);
      
    } else {
      console.log("Registro exitoso:", insertedData);
      setIsSuccessModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Puedes realizar otras acciones después de cerrar el modal de éxito
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    // Puedes realizar otras acciones después de cerrar el modal de error
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
          <h2 className="text-center text-xl font-semibold mb-4">
            Crear Paciente
          </h2>

          {/* Pestañas */}
          <div className="flex justify-center items-center">
            <div className="mt-auto mt-3 mb-3">
              <Link href="/citas/crearCitaExistente">
                <button className="px-4 py-2 rounded-md border border-gray-600 focus:outline-none hover:bg-gray-100">
                  Nueva cita
                </button>
              </Link>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleConfirmation(); }}>
           
           
          <div className="mb-4">
              <label className="block text-sm text-gray-600">Nombre*:</label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Nombre"
                name="nombre"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Apellido paterno*:
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Apellido paterno"
                name="apellido_paterno"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Apellido materno*:
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Apellido materno"
                name="apellido_materno"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Telefono:</label>
              <input
                type="number"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="ejem. 921 118 7752"
                name="telefono"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Email:</label>
              <input
                type="email"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="ejemplo@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            
            <div className="mt-auto text-center">
              <Button type="submit" color="primary">Enviar</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />

      {/* Modal de error */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
      />

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </>
  );
}
