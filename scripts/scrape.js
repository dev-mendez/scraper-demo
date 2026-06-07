import { google } from 'googleapis';

// Autenticación directa mediante el Access Token temporal de Google
const auth = new google.auth.OAuth2();
auth.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN
});

const sheets = google.sheets({ version: 'v4', auth });
const defaultSheetUrl = 'https://docs.google.com/spreadsheets/d/1XPVXdd52HCdMNlvD53yD77VY6uwNnhfOPhB87PCjmyA/edit?pli=1&gid=0#gid=0';
const spreadsheetId =
  process.env.GOOGLE_SHEET_ID ||
  defaultSheetUrl.match(/\/d\/([^/]+)/)?.[1];

async function guardarDatos() {
  try {
    const filaNueva = ['Fecha Hoy', 'Producto Ejemplo', '$99.99']; 

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Hoja 1!A:C', // Ajusta el nombre de tu pestaña
      valueInputOption: 'USER_ENTERED',
      resource: { values: [filaNueva] }
    });

    console.log('¡Datos guardados con éxito!');
  } catch (error) {
    console.error('Error al guardar en Google Sheets:', error);
  }
}

guardarDatos();
