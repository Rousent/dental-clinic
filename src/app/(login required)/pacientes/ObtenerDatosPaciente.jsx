import { supabase } from "../Supabase";

export async function ObtenerDatosPaciente(paciente) {
  try {
    const { data, error } = await supabase
      .from('pacientes')
      .select('*')
      .eq('id', paciente)
      .single(); // Utiliza single() si esperas un solo resultado

    if (error) {
      console.error('Error al obtener datos desde Supabase:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error al obtener datos del paciente:', error.message);
    throw error;
  }
}


