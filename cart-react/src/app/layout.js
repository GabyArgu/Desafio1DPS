// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Crearemos este archivo en el siguiente paso

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Comida Argentina",
  description: "Aplicación Compra argentina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}