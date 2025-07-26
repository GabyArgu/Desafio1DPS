// src/app/utils/imageLoader.js

const imageLoader = ({ src, width, quality }) => {
  // Aquí puedes modificar la URL si lo necesitas, por ejemplo, añadir parámetros
  // para un CDN o servicio de optimización de imágenes.
  // Para tu caso, simplemente retornamos la URL tal cual.
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default imageLoader;