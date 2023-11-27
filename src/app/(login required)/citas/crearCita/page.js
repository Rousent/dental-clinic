export default function crearCita() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
          <h2 className="text-center text-xl font-semibold mb-4">
            Crear cita - Nuevo Paciente
          </h2>

          <div className="mt-auto flex text-center mt-3 mb-3">
            <a href="/citas/crearCita">
              <button className="px-4 py-2 rounded-tl-md rounded-bl-md border border-gray-300 focus:outline-none hover:bg-gray-100">
                Nuevo paciente
              </button>
            </a>
            <a href="/citas/crearCitaExistente">
              <button className="px-4 py-2 rounded-tr-md rounded-br-md border border-l-0 border-gray-300 focus:outline-none hover:bg-gray-100">
                Paciente existente
              </button>
            </a>
          </div>

          <form action="{% url 'crearCita' %}" method="POST">
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
              <label className="block text-sm text-gray-600">Teléfono:</label>
              <input
                type="number"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Teléfono"
                name="telefono"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Email:</label>
              <input
                type="email"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Teléfono"
                name="email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Cita:</label>
              <div className="border-b-2 border-black mt-2"></div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Seleccione un especialista*:
              </label>
              <select
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Nombre"
                name="especialista"
                required
              >
                <option value="" disabled selected>
                  Seleccione al especialista
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Fecha*:</label>
              <input
                type="date"
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Fecha"
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
                name="horaInicio"
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
                name="horaTermino"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Procedimiento*:</label>
              <textarea
                className="w-full border border-black rounded-md px-3 py-2"
                placeholder="Procedimiento"
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
                name="costo"
                required
              />
            </div>

            <div className="mt-auto text-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
                Crear cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
