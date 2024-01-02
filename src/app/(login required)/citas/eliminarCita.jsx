// eliminarPaciente.js

import { supabase } from "../Supabase"; 

const eliminarCita = async (citaId) => {
  try {
    const { data, error } = await supabase
      .from('citas') // Reemplaza 'nombre_de_tu_tabla' con el nombre real de tu tabla
      .delete()
      .eq('id', citaId);

    if (error) {
      console.error('Error al eliminar la cita:', error.message);
    } else {
      console.log('Cita eliminado con éxito:', data);
    }
  } catch (error) {
    console.error('Error inesperado:', error.message);
  }
};

export default eliminarCita;
