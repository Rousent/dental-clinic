import { supabase } from "../../Supabase";
export async function ObtenerDatosEspecialistaAll() {
  const { data, error } = await supabase.from('perfiles').select('*');
  if (error) {
    console.error('Error al obtener datos desde Supabase:', error.message);
    return null;
  }
  return data;
}
