export const formatearCantidad = (cantidad) => {

  return Number(cantidad).toLocaleString('en-US',
  {
    style: "currency",
    currency: "USD"
  })
}

export const generarID = () => {
  // Se genera numero random para ID de cada gasto, se le quitan los primeros caracteres
    // Tambien se puede utilizar el Date.now para el ID
    const random = Math.random().toString(36).substring(2, 11)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatoFecha = (fecha) => {
  // A partir de la fecha recibida, la convierte al formato deseado
  const fechaNueva = new Date(fecha)
  const opciones = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones)
}