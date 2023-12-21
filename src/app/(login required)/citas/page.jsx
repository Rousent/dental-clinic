"use client";
import Link from "next/link";
import { ObtenerDatosCita } from "./ObtenerDatosCita";
import { ObtenerDatosPacienteAll } from "../pacientes/ObtenerDatosPacienteAll";
import { ObtenerDatosEspecialistaAll } from "./crearCitaExistente/ObtenerDatosEspecialistaAll";
import { useEffect, useState } from "react";
import { actualizarDatos } from "./actualizarDatos";
import eliminarCita from "./eliminarCita";
import { Button,} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,} from "@nextui-org/react";
import ErrorModalActualizar from "./ErrorModalActualizar";
import ModalActualizar from "./ModalActualizar";

//Inicio de la funcion Citas
export default function Citas() {

  const [filtroNombre, setFiltroNombre] = useState("");

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setErrorModalIsOpen(false);
  };

  const [datos, setDatos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Inicializar el estado de los nuevos datos
  const [nuevosDatos, setNuevosDatos] = useState({
    fecha: "",
    hora_inicio: "",
    hora_termino: "",
    procedimiento: "",
    costo: "",
    especialista: "",
    paciente: "",
  });

  useEffect(() => {
    async function cargarDatos() {
      const citas = await ObtenerDatosCita();
      const pacientes = await ObtenerDatosPacienteAll();
      const especialistas = await ObtenerDatosEspecialistaAll();

      if (citas && pacientes && especialistas) {
        // Iterar sobre las citas y encontrar los datos del paciente y del especialista
        const datosCombinados = citas.map((cita) => {
          const pacienteData = pacientes.find(
            (paciente) => paciente.id === cita.paciente
          );
          const especialistaData = especialistas.find(
            (especialista) => especialista.id === cita.especialista
          );
          return {
            id: cita.id,
            fecha: cita.fecha,
            hora_inicio: cita.hora_inicio,
            hora_termino: cita.hora_termino,
            procedimiento: cita.procedimiento,
            costo: cita.costo,
            especialista: especialistaData,
            paciente: pacienteData,
          };
        });

        setDatos(datosCombinados);
        setPacientes(pacientes);
        setEspecialistas(especialistas);
      }
    }

    cargarDatos();
  }, []);

  const handleAbrirModal = (item) => {
    // Agrega lógica para verificar si el nombre del paciente cumple con el filtro
    const nombreCompleto = `${item.paciente.nombre} ${item.paciente.apellido_paterno} ${item.paciente.apellido_materno}`;
    
    if (nombreCompleto.toLowerCase().includes(filtroNombre.toLowerCase())) {
      setSelectedItem(item);
      setNuevosDatos({
        fecha: item.fecha,
        hora_inicio: item.hora_inicio,
        hora_termino: item.hora_termino,
        procedimiento: item.procedimiento,
        costo: item.costo,
        especialista: item.especialista.id,
        paciente: item.paciente.id,
      }); // Inicializar el formulario con los datos actuales
      setModalIsOpen(true);
    }
  };

  const handleCerrarModal = () => {
    setModalIsOpen(false);
  };

  const handleActualizar = async () => {
    try {
      const { id } = selectedItem;
      const updatedData = await actualizarDatos(id, nuevosDatos);
      console.log("Datos actualizados con éxito:", updatedData);
      window.location.reload(); // Recargar la página
      setModalIsOpen(false); // Cerrar el modal después de la actualización
    } catch (error) {
      console.error("Error al actualizar datos:", error.message);
      setErrorMessage(
        "Error al actualizar datos. Por favor, inténtalo de nuevo."
      );
      setErrorModalIsOpen(true);
    }
  };

  const handleEliminar = async (citaId) => {
    const confirmacion = window.confirm(
      "¿Seguro que deseas eliminar esta cita?"
    );

    if (confirmacion) {
      await eliminarCita(citaId);
      window.location.reload(); // Recargar la página después de la eliminación
    }
  };

  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold mt-5 mb-3">
        Lista de citas
      </h1>
      <div className="mt-auto text-center mb-5">
        <Link href="citas/crearCitaExistente/">
          <Button color="primary" >
            Crear Cita
          </Button>
        </Link>
      </div>

      <div className="mb-3">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Buscar por nombre del paciente:
    </label>
    <input
      type="text"
      value={filtroNombre}
      onChange={(e) => setFiltroNombre(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Nombre del paciente"
    />
  </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID cita</TableColumn>
          <TableColumn>Nombre del paciente</TableColumn>
          <TableColumn>Fecha de la cita</TableColumn>
          <TableColumn>Hora de inicio</TableColumn>
          <TableColumn>Hora de termino</TableColumn>
          <TableColumn>Especialista</TableColumn>
          <TableColumn>Procedimiento</TableColumn>
          <TableColumn>Costo</TableColumn>
          <TableColumn>Actualizar</TableColumn>
          <TableColumn>Eliminar</TableColumn>{" "}
          {/* Nueva columna para el botón de eliminar */}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
        {datos
          .filter((item) => {
            const nombreCompleto = `${item.paciente.nombre} ${item.paciente.apellido_paterno} ${item.paciente.apellido_materno}`;
            /* const nombreCompletoEspecialista = `${item.especialista.nombre} ${item.especialista.apellido_paterno} ${item.especialista.apellido_materno}`; */
            return nombreCompleto.toLowerCase().includes(filtroNombre.toLowerCase()); /* || nombreCompletoEspecialista.toLowerCase().includes(filtroNombre.toLowerCase()); */
          })
          .map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {item.paciente.nombre} {item.paciente.apellido_paterno}{" "}
                {item.paciente.apellido_materno}
              </TableCell>
              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.hora_inicio}</TableCell>
              <TableCell>{item.hora_termino}</TableCell>
              <TableCell>
              {item.especialista.nombre} {item.especialista.apellido_paterno}{" "}
              {item.especialista.apellido_materno}
              </TableCell>
              <TableCell>{item.procedimiento}</TableCell>
              <TableCell>{item.costo}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleAbrirModal(item)}>
                  Actualizar
                </Button>
              </TableCell>
              <TableCell>
                <Button color="danger" onClick={() => handleEliminar(item.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de actualización */}
      <ModalActualizar
        isOpen={modalIsOpen}
        onClose={handleCerrarModal}
        handleActualizar={handleActualizar}
        nuevosDatos={nuevosDatos}
        setNuevosDatos={setNuevosDatos}
        pacientes={pacientes}
        especialistas={especialistas}
      />

      {/* Modal de error */}
      <ErrorModalActualizar
        isOpen={errorModalIsOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
}
