/** @format */

const { sql, dbConfig } = require('../Dbase/db_Sql');

const getBooks = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}

			const request = new sql.Request();
			request.execute('ListarLibros', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Data = null;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Data = result.recordset;
				respuesta.Message = 'Ok';
				res.status(200).send(respuesta);
				return;
			});
		});
	} catch (err) {
		respuesta.Succes = false;
		respuesta.Data = null;
		respuesta.Message = err.message;
		res.status(500).send(respuesta);
		return;
	}
};

// Obtener un usuario por ID
const getByIdBooks = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const BookID = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('LibroID', sql.Int, BookID);

			request.execute('ObtenerLibroPorID', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				if (result.recordset.length === 0) {
					respuesta.Succes = false;
					respuesta.Message = `El libro con el ID ${UsuarioID} no existe.`;
					res.status(404).send(respuesta);
					return;
				}
				if (result.recordset[0].Mensaje) {
					respuesta.Message = result.recordset[0].Mensaje;
				} else {
					respuesta.Message = 'Ok';
				}

				respuesta.Data = result.recordset[0];
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

// Crear un nuevo usuario
const crearBook = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const { Titulo, Autor, FechaPublicacion, Precio } = req.body;

		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}

			const request = new sql.Request();
			request.input('Titulo', sql.NVarChar(100), Titulo);
			request.input('Autor', sql.NVarChar(100), Autor);
			request.input('FechaPublicacion', sql.NVarChar(100), FechaPublicacion);
			request.input('Precio', sql.NVarChar(100), Precio);

			request.execute('CrearLibro', (err, result) => {
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

// Actualizar un usuario por ID
const actualizarBook = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const { BookId, Titulo, Autor, FechaPublicacion, Precio } = req.body;
		const BookIDUrl = req.params.id;
		if (BookIDUrl != BookId) {
			respuesta.Succes = false;
			respuesta.Data = null;
			respuesta.Message = 'Los ids no coinciden';
			res.status(400).send(respuesta);
			return;
		}
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('LibroID', sql.Int(100), BookId);
			request.input('Titulo', sql.NVarChar(100), Titulo);
			request.input('Autor', sql.NVarChar(100), Autor);
			request.input('FechaPublicacion', sql.NVarChar(100), FechaPublicacion);
			request.input('Precio', sql.NVarChar(100), Precio);

			request.execute('EditarLibro', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				const mensaje =
					result.recordset.length > 0
						? result.recordset[0].Mensaje
						: 'Operación realizada';
				respuesta.Succes = true;
				respuesta.Message = mensaje;
				respuesta.Data = null; // Si quieres devolver datos adicionales, puedes asignarlos aquí
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

// Eliminar un usuario por ID
const eliminarBook = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const bookID = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('LibroID', sql.Int, bookID);

			request.execute('EliminarLibro', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				const mensaje =
					result.recordset.length > 0
						? result.recordset[0].Mensaje
						: 'Operación realizada';
				respuesta.Succes = true;
				respuesta.Message = mensaje;
				respuesta.Data = null; // Si quieres devolver datos adicionales, puedes asignarlos aquí
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
	getBooks,
	getByIdBooks,
	crearBook,
	actualizarBook,
	eliminarBook,
};
