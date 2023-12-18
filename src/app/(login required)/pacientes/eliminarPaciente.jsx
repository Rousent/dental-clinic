// eliminarPaciente.js

import { supabase } from "../Supabase";

const eliminarPaciente = async (pacienteId) => {
  try {
    const { data, error } = await supabase
      .from('pacientes') // Reemplaza 'nombre_de_tu_tabla' con el nombre real de tu tabla
      .delete()
      .eq('id', pacienteId);

    if (error) {
      console.error('Error al eliminar paciente:', error.message);
    } else {
      console.log('Paciente eliminado con éxito:', data);
    }
  } catch (error) {
    console.error('Error inesperado:', error.message);
  }
};

export default eliminarPaciente;
