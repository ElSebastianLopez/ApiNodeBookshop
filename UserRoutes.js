/** @format */

const { Router } = require('express');
const {
	getUsuarios,
	crearUsuarios,
	actualizarUsuarios,
	eliminarUsuario,
	getByIdUsuarios,
} = require('./Controllers/UserController');



const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getByIdUsuarios);
router.post('/', crearUsuarios);
router.put(
	'/:id',actualizarUsuarios,
);

router.delete('/:id', eliminarUsuario);

module.exports = router;
