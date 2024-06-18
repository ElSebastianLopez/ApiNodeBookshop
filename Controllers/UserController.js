/** @format */

const { sql, dbConfig } = require('../Dbase/db_Sql');

const getUsuarios = async (req, res) => {
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
			request.execute('ListarUsuarios', (err, result) => {
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
const getByIdUsuarios = async (req, res) => {
	let respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const UsuarioID = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('UsuarioID', sql.Int, UsuarioID);

			request.execute('ObtenerUsuarioPorID', (err, result) => {
				if (err) {
					respuesta.Succes = false;
					respuesta.Message = err.message;
					res.status(400).send(respuesta);
					return;
				}
				if (result.recordset.length === 0) {
					respuesta.Succes = false;
					respuesta.Message = `El usuario con el ID ${UsuarioID} no existe.`;
					res.status(404).send(respuesta);
					return;
				}
				respuesta.Succes = true;
				respuesta.Message = 'Usuario encontrado';
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
const crearUsuarios = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const { Nombre, Email } = req.body;

		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}

			const request = new sql.Request();
			request.input('Nombre', sql.NVarChar(100), Nombre);
			request.input('Email', sql.NVarChar(100), Email);

			request.execute('CrearUsuario', (err, result) => {
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
const actualizarUsuarios = async (req, res) => {
	const respuesta = {
		Succes: Boolean,
		Message: String,
		Data: Object,
	};
	try {
		const { UsuarioID, Nombre, Email } = req.body;
        const UsuarioIDUrl = req.params.id;
        if(UsuarioIDUrl!=UsuarioID){
            respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = "Los ids no coinciden";
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
			request.input('UsuarioID', sql.Int, UsuarioID);
			request.input('Nombre', sql.NVarChar(100), Nombre);
			request.input('Email', sql.NVarChar(100), Email);

			request.execute('EditarUsuario', (err, result) => {
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
const eliminarUsuario = async (req, res) => {
    let respuesta = {
        Succes: Boolean,
        Message: String,
        Data: Object,
    };
	try {		
		const UsuarioID = req.params.id;
		sql.connect(dbConfig, (err) => {
			if (err) {
				respuesta.Succes = false;
				respuesta.Data = null;
				respuesta.Message = err.message;
				res.status(400).send(respuesta);
				return;
			}
			const request = new sql.Request();
			request.input('UsuarioID', sql.Int, UsuarioID);

			request.execute('EliminarUsuario', (err, result) => {
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
	getUsuarios,
	getByIdUsuarios,
	crearUsuarios,
	actualizarUsuarios,
	eliminarUsuario,
};
