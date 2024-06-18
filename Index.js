/** @format */

const express = require('express');
const cors = require('cors');



// Crear la aplicación Express
const app = express();
app.use(cors());
app.use(express.json());
app.use('/usuarios',require('./UserRoutes'));
app.use('/libros',require('./BookRouter'));
app.use('/pedidos',require('./PedidosRoutes'));




// // Endpoint para manejar libros
// app
// 	.route('/libros')
// 	.get((req, res) => {
// 		const request = new sql.Request();
// 		request.query('SELECT * FROM Libros', (err, result) => {
// 			if (err) console.log(err);
// 			res.json(result.recordset);
// 		});
// 	})
// 	.post((req, res) => {
// 		const { Titulo, Autor, Precio } = req.body;
// 		const request = new sql.Request();
// 		request.query(
// 			`INSERT INTO Libros (Titulo, Autor, Precio) VALUES ('${Titulo}', '${Autor}', ${Precio})`,
// 			(err, result) => {
// 				if (err) console.log(err);
// 				res.json({ message: 'Libro creado' });
// 			},
// 		);
// 	});

// // Endpoint para manejar pedidos
// app
// 	.route('/pedidos')
// 	.get((req, res) => {
// 		const request = new sql.Request();
// 		request.query('SELECT * FROM Pedidos', (err, result) => {
// 			if (err) console.log(err);
// 			res.json(result.recordset);
// 		});
// 	})
// 	.post((req, res) => {
// 		const { UsuarioID, FechaPedido } = req.body;
// 		const request = new sql.Request();
// 		request.query(
// 			`INSERT INTO Pedidos (UsuarioID, FechaPedido) VALUES (${UsuarioID}, '${FechaPedido}')`,
// 			(err, result) => {
// 				if (err) console.log(err);
// 				res.json({ message: 'Pedido creado' });
// 			},
// 		);
// 	});

// // Endpoint para manejar detalles de pedidos
// app
// 	.route('/detallepedidos')
// 	.get((req, res) => {
// 		const request = new sql.Request();
// 		request.query('SELECT * FROM DetallePedidos', (err, result) => {
// 			if (err) console.log(err);
// 			res.json(result.recordset);
// 		});
// 	})
// 	.post((req, res) => {
// 		const { PedidoID, LibroID, Cantidad, Precio } = req.body;
// 		const request = new sql.Request();
// 		request.query(
// 			`INSERT INTO DetallePedidos (PedidoID, LibroID, Cantidad, Precio) VALUES (${PedidoID}, ${LibroID}, ${Cantidad}, ${Precio})`,
// 			(err, result) => {
// 				if (err) console.log(err);
// 				res.json({ message: 'Detalle del pedido creado' });
// 			},
// 		);
// 	});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
	console.log(`Servidor corriendo en http://localhost:${port}`);
});
