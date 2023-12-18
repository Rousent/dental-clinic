'use client'
import Link from "next/link";
import { ObtenerDatosPacienteAll } from "../../pacientes/ObtenerDatosPacienteAll";
import { ObtenerDatosEspecialista } from "./ObtenerDatosEspecialista";
import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import ConfirmationModal from "./ConfirmationModal";
import { supabase } from "../../Supabase";

export default function crearCitaExistente() {

  const [datos, setDatos] = useState([]);
  const [datosEspecialista, setDatosEspecialista] = useState([]);


  useEffect(() => {
      async function cargarDatos() {
        const datos = await ObtenerDatosPacienteAll();
        if (datos) {
          setDatos(datos);
        }
      }
  
      cargarDatos();
    }, []);


  useEffect(() => {
      async function cargarDatos() {
        const datosEspecialista = await ObtenerDatosEspecialista();
        if (datosEspecialista) {
          setDatosEspecialista(datosEspecialista);
        }
      }
  
      cargarDatos();
    }, []);


  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


    const [data, setData] = useState({
      fecha: "",
      hora_inicio: "",
      hora_termino: "",
      procedimiento: "",
      costo: "",
      paciente: "",
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
      if (!data.fecha || !data.hora_inicio || !data.hora_termino || !data.procedimiento || !data.costo || !data.paciente) {
        setIsErrorModalOpen(true);
        return;
      }
  
      // Realiza el registro en la tabla de Supabase
      const { data: insertedData, error } = await supabase
        .from("citas_duplicate")
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
      <div className=" flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
          {/* Título centrado */}
          <h2 className="text-center text-xl font-semibold mb-4">
            Crear cita - Paciente Existente
          </h2>

          {/* Pestañas */}
          <div className="mt-auto flex text-center mt-3 mb-3">
            <Link href="/citas/crearCita">
              <button className="px-4 py-2 rounded-tl-md rounded-bl-md border border-gray-300 focus:outline-none hover:bg-gray-100">
                Nuevo paciente
              </button>
            </Link>
            <Link href="/citas/crearCitaExistente">
              <button className="px-4 py-2 rounded-tr-md rounded-br-md border border-l-0 border-gray-300 focus:outline-none hover:bg-gray-100">
                Paciente existente
              </button>
            </Link>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleConfirmation(); }}>
            {/* Contenido de la tarjeta */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Seleccione un paciente*:
              </label>
              <select
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Nombre"
                onChange={handleChange}
                name="paciente"
                required
              >
                <option defaultValue="" >
                  Seleccione un paciente
                </option>
                
                {datos.map((item) => (
                  <option key={item.id} value={item.id}>
                    
                    {item.nombre} {item.apellido_paterno}{" "}
                    {item.apellido_materno}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Cita:</label>
              <div className="border-b-2 border-black mt-2"></div>
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Seleccione un especialista*:
              </label>
              <select
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Nombre"
                onChange={handleChange}
                name="especialista"
                required
              >
                <option defaultValue="" >
                  Seleccione al especialista
                </option>
               {datosEspecialista.map((item) =>(
                  <option key={item.id} value={item.id}>
                    {item.nombre} {item.apellido_paterno}{" "}
                    {item.apellido_materno}
                  </option>
               ))}
              </select>
            </div>   */}

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Fecha*:</label>
              <input
                type="date"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Fecha"
                onChange={handleChange}
                name="fecha"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Hora de Inicio*:
              </label>
              <input
                type="time"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Hora de inicio"
                onChange={handleChange}
                name="hora_inicio"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Hora de Termino (Aproximado)*:
              </label>
              <input
                type="time"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Hora de termino"
                onChange={handleChange}
                name="hora_termino"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Procedimiento*:</label>
              <textarea
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Procedimiento"
                onChange={handleChange}
                name="procedimiento"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Costo*:</label>
              <input
                type="number"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Costo"
                onChange={handleChange}
                name="costo"
                required
              />
            </div>

            <div className="mt-auto text-center">
              <Button className="bg-blue-500 text-white py-2 px-4 rounded-full" type="submit">
                Crear cita
              </Button>
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
