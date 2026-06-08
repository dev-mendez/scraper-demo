import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

async function guardarDatos() {
  try {
    // Autenticación con Service Account usando GOOGLE_CREDENTIALS
    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const filaNueva = ["Fecha Hoy", "Producto Ejemplo", "$99.99"];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Hoja 1!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [filaNueva]
      }
    });

    console.log("¡Datos guardados con éxito!");
  } catch (error) {
    console.error("Error al guardar en Google Sheets:", error);
  }
}

guardarDatos();
