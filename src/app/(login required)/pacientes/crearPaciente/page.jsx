"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Pruebas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFormConfirmed, setIsFormConfirmed] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleEnviarFormulario = () => {
    // Obtener valores de los campos
    const nombre = document.querySelector('input[name="nombre"]').value;
    const apellidoPaterno = document.querySelector('input[name="apellidoPaterno"]').value;
    const apellidoMaterno = document.querySelector('input[name="apellidoMaterno"]').value;

    // Validar que los campos estén llenos
    if (nombre && apellidoPaterno && apellidoMaterno) {
      // Abrir el modal de confirmación
      onOpen();
    } else {
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmarEnvio = () => {
    // Aquí puedes agregar la lógica para enviar el formulario
    // Cerrar el modal de confirmación
    onClose();
    // Mostrar el segundo modal
    setIsSuccessModalOpen(true);
  };

  const handleCerrarSuccessModal = () => {
    // Cerrar el segundo modal
    setIsSuccessModalOpen(false);
    // Marcar el formulario como confirmado
    setIsFormConfirmed(true);
  };

  const handleCerrarErrorModal = () => {
    setIsErrorModalOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-6 w-80 mt-7 mb-7">
          <h2 className="text-center text-xl font-semibold mb-4">
            Crear Paciente
          </h2>

          <form>
            {/* Resto del formulario */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Nombre*:</label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Nombre"
                name="nombre"
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
                name="apellidoPaterno"
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
                name="apellidoMaterno"
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
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Email:</label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="ejemplo@gmail.com"
                name="email"
              />
            </div>

            <div className="mt-auto text-center">
              <Button type="button" onClick={handleEnviarFormulario}>
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            ¿Está seguro de crear un nuevo paciente?
          </ModalHeader>
          <ModalBody className="flex text-center">
            <p>
              Una vez creado el paciente, se añadira a la lista de pacientes.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleConfirmarEnvio}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Segundo modal (éxito) */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleCerrarSuccessModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
          Paciente creado con éxito
          </ModalHeader>
          <ModalFooter className="flex justify-center">
            {" "}
            {/* Añadir la clase "flex justify-center" para centrar el contenido */}
            <Button color="primary" onClick={handleCerrarSuccessModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Tercer modal */}
      <Modal isOpen={isErrorModalOpen} onClose={handleCerrarErrorModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Error
          </ModalHeader>
          <ModalBody className="flex text-center">
            <p>Por favor, completa todos los campos.</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button color="danger" onClick={handleCerrarErrorModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
