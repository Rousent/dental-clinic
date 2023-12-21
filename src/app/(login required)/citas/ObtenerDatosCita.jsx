import { supabase } from "../Supabase";

export async function ObtenerDatosCita() {
  const { data, error } = await supabase.from('citas').select('*');
  if (error) {
    console.error('Error al obtener datos desde Supabase:', error.message);
    return null;
  }
  return data;
}
