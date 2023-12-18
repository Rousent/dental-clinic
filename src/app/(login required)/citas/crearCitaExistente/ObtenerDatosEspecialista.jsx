import { supabase } from "../../Supabase";
export async function ObtenerDatosEspecialista() {
  const { data, error } = await supabase.from('especialidades').select('*');
  if (error) {
    console.error('Error al obtener datos desde Supabase:', error.message);
    return null;
  }
  return data;
}
