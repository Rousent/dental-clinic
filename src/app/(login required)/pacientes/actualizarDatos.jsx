// Ejemplo de función para actualizar datos en Supabase

import { supabase } from '../Supabase';

export async function actualizarDatos(id, nuevosDatos) {
  const { data, error } = await supabase
    .from('pacientes')
    .update(nuevosDatos)
    .match({ id });

  if (error) {
    console.error('Error al actualizar datos en Supabase:', error.message);
    return null;
  }

  return data;
}
