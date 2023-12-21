// ModalActualizar.jsx
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalBody } from "@nextui-org/react";

const ModalActualizar = ({ isOpen, onClose, handleActualizar, nuevosDatos, setNuevosDatos, pacientes, especialistas }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">Actualizar Datos</ModalHeader>
        <form>
          <ModalBody>
            <label>
              Paciente:
              <select
                value={parseInt(nuevosDatos.paciente, 10)}
                onChange={(e) => setNuevosDatos({ ...nuevosDatos, paciente: parseInt(e.target.value, 10) })}
              >
                <option value="">Seleccionar Paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {`${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}`}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Especialista:
              <select
                value={nuevosDatos.especialista}
                onChange={(e) => setNuevosDatos({ ...nuevosDatos, especialista: e.target.value})}
              >
                <option value="">Seleccionar Especialista</option>
                {especialistas.map((especialista) => (
                  <option key={especialista.id} value={especialista.id}>
                    {`${especialista.nombre} ${especialista.apellido_paterno} ${especialista.apellido_materno}`}
                  </option>
                ))}
              </select>
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
            <Button color="danger" type="button" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalActualizar;
