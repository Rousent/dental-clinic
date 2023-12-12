'use client'
import Link from "next/link";
import { ObtenerDatosCita } from "./ObtenerDatosCita";
import { useEffect, useState } from 'react';
import { actualizarDatos } from "./actualizarDatos";
import eliminarCita from "./eliminarCita";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalBody } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function Citas() {

  const [datos, setDatos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({ fecha: '', hora_inicio: '', hora_termino: '', procedimiento: '', costo: '', paciente: '' });
  
    useEffect(() => {
      async function cargarDatos() {
        const datos = await ObtenerDatosCita();
        if (datos) {
          setDatos(datos);
        }
      }
  
      cargarDatos();
    }, []);
  
    const handleAbrirModal = (item) => {
      setSelectedItem(item);
      setNuevosDatos({ fecha: item.fecha, hora_inicio: item.hora_inicio, hora_termino: item.hora_termino, procedimiento: item.procedimiento, costo: item.costo, paciente: item.paciente }); // Inicializar el formulario con los datos actuales
      setModalIsOpen(true);
    };
  
    const handleCerrarModal = () => {
      setModalIsOpen(false);
    };
  
    const onClose = () => setModalIsOpen(false);
  
    const handleActualizar = async () => {
      const { id } = selectedItem;
      const updatedData = await actualizarDatos(id, nuevosDatos);
      console.log('Datos actualizados con éxito:', updatedData);
      setModalIsOpen(false); // Cerrar el modal después de la actualización
      window.location.reload(); // Recargar la página
    };

    const handleEliminar = async (citaId) => {
      const confirmacion = window.confirm("¿Seguro que deseas eliminar esta cita?");
      
      if (confirmacion) {
        await eliminarCita(citaId);
        window.location.reload(); // Recargar la página después de la eliminación
      }
    };





  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold mt-10 mb-5">
        Lista de citas
      </h1>
      <div className="mt-auto text-center mb-3">
        <Link href="citas/crearCitaExistente/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
            Crear Cita
          </button>
        </Link>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Paciente</TableColumn>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Hora de inicio</TableColumn>
          <TableColumn>Hora de termino</TableColumn>
          <TableColumn>Procedimiento</TableColumn>
          <TableColumn>Costo</TableColumn>
          <TableColumn>Actualizar</TableColumn>
          <TableColumn>Eliminar</TableColumn> {/* Nueva columna para el botón de eliminar */}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {datos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.paciente}</TableCell>
              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.hora_inicio}</TableCell>
              <TableCell>{item.hora_termino}</TableCell>
              <TableCell>{item.procedimiento}</TableCell>
              <TableCell>{item.costo}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleAbrirModal(item)}>Actualizar</Button>
              </TableCell>
              <TableCell>
                <Button color="danger" onClick={() => handleEliminar(item.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  
        {/* Modal de actualización */}
        <Modal isOpen={modalIsOpen} onRequestClose={handleCerrarModal} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="text-center">
              Actualizar Datos
            </ModalHeader>
            <form>
              <ModalBody>
                <label>
                  Paciente:
                  <input
                    type="text"
                    value={nuevosDatos.paciente}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, paciente: e.target.value })}
                  />
                </label>
                <label>
                  Fecha:
                  <input
                    type="date"
                    value={nuevosDatos.fecha}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, fecha: e.target.value })}
                  />
                </label>
                <label>
                  Hora de inicio:
                  <input
                    type="time"
                    value={nuevosDatos.hora_inicio}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, hora_inicio: e.target.value })}
                  />
                </label>
                <label>
                  Hora de termino:
                  <input
                    type="time"
                    value={nuevosDatos.hora_termino}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, hora_termino: e.target.value })}
                  />
                </label>
                <label>
                  Procedimiento:
                  <input
                    type="text"
                    value={nuevosDatos.procedimiento}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, procedimiento: e.target.value })}
                  />
                </label>
                <label>
                  Costo:
                  <input
                    type="number"
                    value={nuevosDatos.costo}
                    onChange={(e) => setNuevosDatos({ ...nuevosDatos, costo: e.target.value })}
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="button" onClick={handleActualizar}>
                  Actualizar
                </Button>
                <Button color="danger" type="button" onClick={handleCerrarModal}>
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      
    </>
  );
}
