'use client'
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@nextui-org/react";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import ConfirmationModal from "./ConfirmationModal";

export default function Pruebas() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const supabaseUrl = "https://xmrcozfqcoigbngikljv.supabase.co";
  const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcmNvemZxY29pZ2JuZ2lrbGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4ODMwMDIsImV4cCI6MjAxNjQ1OTAwMn0.gBc7Dg8EXh9WpDEDQsEjpEcCVZdlQZgy37wVsf5DS7Y';
  const supabase = createClient(supabaseUrl, supabaseKey);

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
      setIsErrorModalOpen(true);
      return;
    }

    // Realiza el registro en la tabla de Supabase
    const { data: insertedData, error } = await supabase
      .from("pacientes")
      .insert([data]);

    if (error) {
      console.error("Error al insertar datos:", error.message);
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
        <div className="bg-white shadow-md rounded-md p-6 w-80 mt-7 mb-7">
          <h2 className="text-center text-xl font-semibold mb-4">
            Crear Paciente
          </h2>

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
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="ejem. 921 118 7752"
                name="telefono"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Email:</label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="ejemplo@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            
            <div className="mt-auto text-center">
              <Button type="submit">Enviar</Button>
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
