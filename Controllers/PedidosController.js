const { DateTime } = require('mssql');
const { sql, dbConfig } = require('../Dbase/db_Sql');

const getPedidosByIdUsuarios = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const userId = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('userId', sql.Int, userId);

			request.execute('ObtenerPedidosPorUsuario', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Message = 'Ok';
				respuesta.Data = result.recordset;
				res.status(200).send(respuesta);
				return;
			});
		});
	} catch (err) {
		console.error(err);
		respuesta.Succes = false;
		respuesta.Data = null;
		respuesta.Message = err.message;
		res.status(500).send(respuesta);
		return;
	}
};
const getDetallesByPedidosId = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const pedidoId = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('pedidoId', sql.Int, pedidoId);

			request.execute('ObtenerDetallesPorPedido', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Message = 'Ok';
				respuesta.Data = result.recordset;
				res.status(200).send(respuesta);
				return;
			});
		});
	} catch (err) {
		console.error(err);
		respuesta.Succes = false;
		respuesta.Data = null;
		respuesta.Message = err.message;
		res.status(500).send(respuesta);
		return;
	}
};

const crearPedidos = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const {  userId } = req.body;

		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}

			const request = new sql.Request();
			request.input('userId', sql.Int, userId);

			request.execute('CrearPedido', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Data = null;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Data = result.recordset;
				respuesta.Message = result.message;
				res.status(200).send(respuesta);
				return;
			});
		});
	} catch (err) {
		console.error(err);
		respuesta.Succes = false;
		respuesta.Data = null;
		respuesta.Message = err.message;
		res.status(500).send(respuesta);
		return;
	}
};

const crearPedidosDet = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const { pedidoId,libroId,cantidad } = req.body;

		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}

			const request = new sql.Request();
			request.input('pedidoId', sql.Int, pedidoId);
			request.input('libroId', sql.Int, libroId);
			request.input('cantidad', sql.Int, cantidad);

			request.execute('CrearDetallePedido', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Data = null;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Data = result.recordset;
				respuesta.Message = result.message;
				res.status(200).send(respuesta);
				return;
			});
		});
	} catch (err) {
		console.error(err);
		respuesta.Succes = false;
		respuesta.Data = null;
		respuesta.Message = err.message;
		res.status(500).send(respuesta);
		return;
	}
};

module.exports = {
	crearPedidos,
    getPedidosByIdUsuarios,
    getDetallesByPedidosId,
    crearPedidosDet,
	// getByIdUsuarios,
	// crearUsuarios,
	// actualizarUsuarios,
	// eliminarUsuario,
};