// Ejemplo de función para actualizar datos en Supabase

import { supabase } from '../Supabase';

export async function actualizarDatos(id, nuevosDatos) {
  const { data, error } = await supabase
    .from('citas_duplicate')
    .update({
      fecha: nuevosDatos.fecha,
      hora_inicio: nuevosDatos.hora_inicio,
      hora_termino: nuevosDatos.hora_termino,
      procedimiento: nuevosDatos.procedimiento,
      costo: nuevosDatos.costo,
      // Otros campos que desees actualizar
    })
    .match({ id });

  if (error) {
    console.error('Error al actualizar datos en Supabase:', error.message);
    return { error };
  }

  return { data };
}
