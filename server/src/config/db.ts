import mongoose from "mongoose";
import colors from "colors";
import dns from "node:dns";
import { exit } from "node:process";

export const connectDB = async () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    console.log(colors.red.bold("DB_URL no esta definida en variables de entorno"));
    exit(1);
  }

  // Algunos resolutores DNS en Windows fallan con los registros SRV/TXT de MongoDB Atlas.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  try {
    const { connection } = await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 10000,
    });
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.magenta.bold(`MongoDB conectado: ${url}`));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error al conectar a MongoDB"));
    exit(1);
  }
};
