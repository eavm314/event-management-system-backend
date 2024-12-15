export const genCode = (prefix: string, digits: number, id: number) => {
  // Asegurarse de que el número tenga al menos tantos dígitos como se especifica
  const formattedId = String(id).padStart(digits, '0');

  // Construir y devolver el código personalizado
  return `${prefix}${formattedId}`;
}