const { google } from 'googleapis';

// Autenticación directa mediante el Access Token temporal de Google
const auth = new google.auth.OAuth2();
auth.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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
