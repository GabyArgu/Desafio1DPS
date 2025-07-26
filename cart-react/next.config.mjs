// next.config.mjs (o next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Si usas un loader personalizado, NO necesitas la propiedad 'domains'.
        // loader: 'custom', // Solo si lo defines globalmente, pero para tu caso, el loader por componente es mejor.
    },
};

// Cambia esta línea:
// module.exports = nextConfig;

// Por esta línea (para ES Modules):
export default nextConfig;