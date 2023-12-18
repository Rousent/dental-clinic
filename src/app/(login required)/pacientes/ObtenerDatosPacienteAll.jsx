import { supabase } from "../Supabase";
export async function ObtenerDatosPacienteAll() {
    const { data, error } = await supabase.from('pacientes').select('*');
    if (error) {
      console.error('Error al obtener datos desde Supabase:', error.message);
      return null;
    }
    return data;
  }