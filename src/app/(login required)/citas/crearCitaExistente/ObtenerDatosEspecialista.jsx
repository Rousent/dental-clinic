import { supabase } from "../../Supabase";

export async function ObtenerDatosEspecialista(especialista) {
  try {
    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', especialista)
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
