/** @format */

const sql = require('mssql');
// Configuración de la base de datos SQL Server
const dbConfig = {
	user: 'sa',
	password: '1@adminsis',
	server: 'localhost\\SQLEXPRESS',
	database: 'LibreriaDB',
	options: {
		encrypt: true, // Para conexiones seguras
		trustServerCertificate: true, // Para desarrollo
	},
	port: 1433,
};

sql.connect(dbConfig, (err) => {
	if (err) console.log(err);
	else console.log('Conectado a SQL Server');
});

module.exports = {
	sql,
	dbConfig,
};
