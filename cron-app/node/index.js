const { Pool } = require('pg');
const nodemailer = require('nodemailer');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: 'postgres', // nombre del servicio en docker-compose
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  port: 5432,
});

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'croncorreo@gmail.com',
    pass: 'wtbb qkzz hjgd vdpi', // Considera usar variables de entorno para mayor seguridad
  },
});

async function checkAndSendEmails() {
  try {
    const client = await pool.connect();

    // Obtener mensajes no enviados
    const res = await client.query('SELECT * FROM messages WHERE sent = FALSE');

    for (let row of res.rows) {
      // Enviar correo
      let info = await transporter.sendMail({
        from: '"Remitente" croncorreo@gmail.com',
        to: 'Richard26RD@hotmail.com',
        subject: 'Nuevo Mensaje',
        text: row.content,
      });

      console.log('Correo enviado:', info.messageId);

      // Actualizar mensaje como enviado
      await client.query('UPDATE messages SET sent = TRUE WHERE id = $1', [row.id]);
    }

    client.release();
  } catch (err) {
    console.error('Error al enviar correos:', err);
  }
}

// Ejecutar cada 5 segundos
setInterval(checkAndSendEmails, 20000);
